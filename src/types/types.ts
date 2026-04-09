
export interface MealType {
    id: string;
    name: string;
    description: string | null;
    price: number;
    image: string | null;
    isAvailable: boolean;
    categoryId: string;
    providerProfileId: string;
    createdAt: Date;
    updatedAt: Date;
}
export interface UserType {
    id: string;
    email: string;
    name?: string;
    role?: string;
    emailVerified: boolean;
    status?: string;
}