import { Role, UserStatus } from "../../generated/prisma/enums"
import { AppError } from "../../src/error/AppError"
import { prisma } from "../../src/lib/prisma"

// ১. ইউজার রোল এবং স্ট্যাটাস ম্যানেজমেন্ট (Ban/Unban or Role change)
const manageUser = async (userId: string, updateData: { role?: Role, status?: UserStatus }) => {
    return await prisma.user.update({
        where: { id: userId },
        data: updateData
    })
}

// ২. সিস্টেম-ওয়াইড রেভিনিউ অ্যানালিটিক্স
const getSystemStats = async () => {
    const totalRevenue = await prisma.order.aggregate({
        where: { status: "DELIVERED" },
        _sum: { totalPrice: true },
        _count: { id: true }
    })
    const totalUsers = await prisma.user.count()
    const totalProviders = await prisma.providerProfile.count()

    return {
        revenue: totalRevenue._sum.totalPrice || 0,
        orders: totalRevenue._count.id,
        users: totalUsers,
        providers: totalProviders
    }
}

// ৩. প্রোভাইডার ভেরিফিকেশন (Manual Approval)
const verifyProvider = async (providerId: string, isVerified: boolean) => {
    // এখানে চাইলে স্কিমাতে isVerified ফিল্ড যোগ করে নিতে পারো
    return await prisma.providerProfile.update({
        where: { id: providerId },
        data: { 
            // example: status: isVerified ? "ACTIVE" : "PENDING" 
        }
    })
}

// ৪. ক্যাটাগরি ম্যানেজমেন্ট (Create Category)
const createCategory = async (name: string) => {
    return await prisma.category.create({
        data: { name }
    })
}

// ৫. সব অর্ডার ট্র্যাকিং (Monitoring)
const getAllOrders = async () => {
    return await prisma.order.findMany({
        include: {
            customer: { select: { name: true } },
            items: { include: { meal: { select: { name: true } } } }
        },
        orderBy: { createdAt: 'desc' }
    })
}

export const superAdminServices = {
    manageUser,
    getSystemStats,
    verifyProvider,
    createCategory,
    getAllOrders
}