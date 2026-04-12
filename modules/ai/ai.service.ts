import { prisma } from "../../src/lib/prisma";

export const generateAIResponse = async (message: string) => {
    // ১. ডাটাবেস থেকে মিল (Meals) নিয়ে আসা
    const meals = await prisma.meal.findMany({
        select: {
            id: true,
            name: true,
            description: true,
            price: true,
            isAvailable: true,
            category: {
                select: {
                    name: true
                }
            }
        }
    });

    if (!meals || meals.length === 0) {
        return "I'm sorry, our menu is currently empty. Please check back later!";
    }

    // ২. মিল ডাটাকে স্ট্রিং হিসেবে ফরম্যাট করা (AI-কে কন্টেক্সট দেওয়ার জন্য)
    const mealDataString = meals.map((meal) => {
        // ক্যাটাগরি যদি অ্যারে হয় তবে map ব্যবহার করবে, নয়তো সরাসরি নাম নিবে
        const categoryName = Array.isArray(meal.category)
            ? meal.category.map(cat => cat.name).join(", ")
            : (meal.category as any)?.name || "General";

        return `Name: ${meal.name}
                - Description: ${meal.description}
                - Price: ${meal.price} BDT
                - Available: ${meal.isAvailable ? 'Yes' : 'No'}
                - Category: ${categoryName}
                - ID: ${meal.id}`;
    }).join("\n\n---\n\n");

    try {
        const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${process.env.AI_API_KEY}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: 'llama-3.1-8b-instant',
                messages: [
                    {
                        role: 'system',
                        content: `
### ROLE
You are the MealMate AI Assistant, a high-performance meal concierge. Your goal is to help users discover delicious meals, understand pricing, and navigate the MealMate platform.

### KNOWLEDGE BASE (CONTEXT)
- **Current Menu**: 
${mealDataString}

- **URL Pattern**: For any meal details, use: /meals/:id 
(Always use the exact ID provided in the database)

### CAPABILITIES
1. **Meal Recommendations**: Suggest meals based on user taste or description.
2. **Order Guidance**: If a meal is unavailable, suggest an alternative.
3. **Plan Info**: Explain subscription benefits.

### PRICING & PLANS (BhojonBari Specials)
- **FREE**: Standard delivery, contains ads in-app ($0).
- **MONTHLY**: Priority delivery, Ad-Free, 5% Discount on all orders (৳500/month).
- **YEARLY**: Everything in Monthly + 1 Free Meal every month (৳5000/year).

### BEHAVIOR RULES
- **No Hallucination**: Only suggest meals from the "Current Menu" above.
- **Direct Links**: Always provide the link like "/meals/clx..." on a new line.
- **Tone**: Professional, friendly, and startup-style.
- **Language**: English.

### OUTPUT EXAMPLE
"That sounds like a great choice! You'll love our Spicy Chicken.
Link: /meals/cm12345
It's available for immediate order!"
`
                    },
                    {
                        role: 'user',
                        content: message,
                    },
                ],
                temperature: 0.6,
                max_tokens: 400,
            }),
        });

        const data = await response.json();

        if (!response.ok) {
            console.error('AI ERROR:', data);
            throw new Error(data?.error?.message || 'AI API failed');
        }

        return data?.choices?.[0]?.message?.content || 'I could not process that request.';

    } catch (error) {
        console.error('SERVICE ERROR:', error);
        return "Our AI assistant is currently taking a break. Please try again in a few moments!";
    }
}

export const generateMealDescription = async (mealName: string) => {
    if (!mealName) return "Please provide a meal name first.";

    try {
        const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${process.env.AI_API_KEY}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: 'llama-3.1-8b-instant',
                messages: [
                    {
                        role: 'system',
                        content: `
### ROLE
You are a professional culinary copywriter for "MealMate", a premium food delivery platform.

### TASK
Your task is to write a short, mouth-watering, and professional description (minimum 200 character max 250 character) for a meal based ONLY on its name.

### GUIDELINES
- Focus on taste, texture, and appeal (e.g., "crispy," "juicy," "aromatic").
- Tone: Appetizing and modern.
- Output: Just the description text. No greeting, no quotes, no extra talk.
`
                    },
                    {
                        role: 'user',
                        content: `Meal Name: ${mealName}`,
                    },
                ],
                temperature: 0.7, // একটু ক্রিয়েটিভ করার জন্য ০.৭ রাখা হয়েছে
                max_tokens: 150,
            }),
        });

        const data = await response.json();

        if (!response.ok) {
            console.error('AI ERROR:', data);
            return "Delicious and freshly prepared just for you!"; // এরর হলে ডিফল্ট টেক্সট
        }

        return data?.choices?.[0]?.message?.content || "A special dish prepared with secret spices and fresh ingredients.";

    } catch (error) {
        console.error('SERVICE ERROR:', error);
        return "Experience the authentic taste of our chef's special creation.";
    }
};
export const getAiMealRecommendation = async (mealId: string) => {
    if (!mealId) return "No meal ID provided.";

    try {
        const meal = await prisma.meal.findUnique({
            where: { id: mealId },
            include: {
                reviews: {
                    select: {
                        rating: true,
                        comment: true,
                    },
                    take: 10
                },
                category: true
            }
        });

        if (!meal) return "Meal not found.";

        const reviewContext = meal.reviews.length > 0
            ? meal.reviews.map(r => `Rating: ${r.rating}/5, Comment: ${r.comment}`).join(" | ")
            : "No reviews yet, but it's a chef's special.";

        const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${process.env.AI_API_KEY}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: 'llama-3.1-8b-instant',
                messages: [
                    {
                        role: 'system',
                        content: `
### ROLE
You are a persuasive AI Food Sommelier for "MealMate". Your goal is to convince customers to add a specific meal to their cart.

### DATA CONTEXT
- **Meal**: ${meal.name}
- **Category**: ${meal.category?.name}
- **Price**: ${meal.price} BDT
- **Customer Feedback**: ${reviewContext}

### TASK
Write a short, high-energy, and persuasive pitch (max 250 characters). 
- Analyze the reviews (if positive, highlight them; if no reviews, highlight its freshness).
- Use a "Foodie" tone.
- Ending: Must have a subtle call to action to "Add to Plate".
- Language: English.
- Output: Just the pitch text. No intro/outro.
`
                    },
                    {
                        role: 'user',
                        content: `Convince me to buy this ${meal.name}.`,
                    },
                ],
                temperature: 0.8,
                max_tokens: 200,
            }),
        });

        const data = await response.json();

        if (!response.ok) {
            return `Everyone is loving the ${meal.name}! Grab yours before it's gone.`;
        }

        return data?.choices?.[0]?.message?.content || "This dish is trending! Add it to your plate and experience the magic.";

    } catch (error) {
        console.error('AI RECOMMENDATION ERROR:', error);
        return "Our food experts highly recommend this dish for your next meal!";
    }
};