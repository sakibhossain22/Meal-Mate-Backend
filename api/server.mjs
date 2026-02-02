var __getOwnPropNames = Object.getOwnPropertyNames;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};

// generated/prisma/internal/class.ts
import * as runtime from "@prisma/client/runtime/client";
async function decodeBase64AsWasm(wasmBase64) {
  const { Buffer: Buffer2 } = await import("buffer");
  const wasmArray = Buffer2.from(wasmBase64, "base64");
  return new WebAssembly.Module(wasmArray);
}
function getPrismaClientClass() {
  return runtime.getPrismaClient(config);
}
var config;
var init_class = __esm({
  "generated/prisma/internal/class.ts"() {
    "use strict";
    config = {
      "previewFeatures": [],
      "clientVersion": "7.3.0",
      "engineVersion": "9d6ad21cbbceab97458517b147a6a09ff43aa735",
      "activeProvider": "postgresql",
      "inlineSchema": '// This is your Prisma schema file,\n// learn more about it in the docs: https://pris.ly/d/prisma-schema\n\n// Looking for ways to speed up your queries, or scale easily with your serverless or edge functions?\n// Try Prisma Accelerate: https://pris.ly/cli/accelerate-init\n\ngenerator client {\n  provider = "prisma-client"\n  output   = "../generated/prisma"\n}\n\ndatasource db {\n  provider = "postgresql"\n}\n\nenum Role {\n  CUSTOMER\n  PROVIDER\n  ADMIN\n}\n\nenum UserStatus {\n  ACTIVE\n  INACTIVE\n  BANNED\n}\n\nenum OrderStatus {\n  PENDING\n  CONFIRMED\n  COOKING\n  ON_THE_WAY\n  DELIVERED\n  CANCELLED\n}\n\nmodel User {\n  id            String           @id @default(uuid())\n  name          String\n  email         String           @unique\n  role          Role             @default(CUSTOMER)\n  image         String?\n  profile       ProviderProfile?\n  orders        Order[]\n  reviews       Review[]\n  emailVerified Boolean          @default(false)\n  phone         String?\n  status        UserStatus?      @default(ACTIVE)\n  createdAt     DateTime         @default(now())\n  updatedAt     DateTime         @updatedAt\n  sessions      Session[]\n  accounts      Account[]\n  carts         Cart[]\n\n  @@map("user")\n}\n\nmodel ProviderProfile {\n  id            String   @id @default(uuid())\n  businessName  String\n  description   String?\n  address       String\n  contactNumber String\n  userId        String   @unique\n  user          User     @relation(fields: [userId], references: [id])\n  meals         Meal[]\n  createdAt     DateTime @default(now())\n  updatedAt     DateTime @updatedAt\n}\n\nmodel Category {\n  id    String @id @default(uuid())\n  name  String @unique\n  meals Meal[]\n}\n\nmodel Meal {\n  id                String          @id @default(uuid())\n  name              String\n  description       String?\n  price             Float\n  image             String?\n  isAvailable       Boolean         @default(true)\n  categoryId        String\n  category          Category        @relation(fields: [categoryId], references: [id])\n  providerProfileId String\n  provider          ProviderProfile @relation(fields: [providerProfileId], references: [id])\n  orderItems        OrderItem[]\n  reviews           Review[]\n  createdAt         DateTime        @default(now())\n  updatedAt         DateTime        @updatedAt\n  cartItems         CartItem[]\n}\n\nmodel Order {\n  id         String      @id @default(uuid())\n  status     OrderStatus @default(PENDING)\n  totalPrice Float\n  customerId String\n  customer   User        @relation(fields: [customerId], references: [id])\n  items      OrderItem[]\n  createdAt  DateTime    @default(now())\n  updatedAt  DateTime    @updatedAt\n}\n\nmodel OrderItem {\n  id       String  @id @default(uuid())\n  orderId  String\n  order    Order   @relation(fields: [orderId], references: [id])\n  mealId   String\n  meal     Meal    @relation(fields: [mealId], references: [id])\n  quantity Int\n  price    Float\n  address  String?\n}\n\nmodel Cart {\n  id        String     @id @default(uuid())\n  userId    String\n  user      User       @relation(fields: [userId], references: [id])\n  items     CartItem[]\n  createdAt DateTime   @default(now())\n  updatedAt DateTime   @updatedAt\n\n  @@map("cart")\n}\n\nmodel CartItem {\n  id        String   @id @default(uuid())\n  cartId    String\n  cart      Cart     @relation(fields: [cartId], references: [id])\n  mealId    String\n  meal      Meal     @relation(fields: [mealId], references: [id])\n  quantity  Int\n  price     Float\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  @@map("cart_item")\n}\n\nmodel Review {\n  id         String   @id @default(uuid())\n  rating     Int\n  comment    String?\n  customerId String\n  customer   User     @relation(fields: [customerId], references: [id])\n  mealId     String\n  meal       Meal     @relation(fields: [mealId], references: [id])\n  createdAt  DateTime @default(now())\n}\n\nmodel Session {\n  id        String   @id\n  expiresAt DateTime\n  token     String\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n  ipAddress String?\n  userAgent String?\n  userId    String\n  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)\n\n  @@unique([token])\n  @@index([userId])\n  @@map("session")\n}\n\nmodel Account {\n  id                    String    @id\n  accountId             String\n  providerId            String\n  userId                String\n  user                  User      @relation(fields: [userId], references: [id], onDelete: Cascade)\n  accessToken           String?\n  refreshToken          String?\n  idToken               String?\n  accessTokenExpiresAt  DateTime?\n  refreshTokenExpiresAt DateTime?\n  scope                 String?\n  password              String?\n  createdAt             DateTime  @default(now())\n  updatedAt             DateTime  @updatedAt\n\n  @@index([userId])\n  @@map("account")\n}\n\nmodel Verification {\n  id         String   @id\n  identifier String\n  value      String\n  expiresAt  DateTime\n  createdAt  DateTime @default(now())\n  updatedAt  DateTime @updatedAt\n\n  @@index([identifier])\n  @@map("verification")\n}\n',
      "runtimeDataModel": {
        "models": {},
        "enums": {},
        "types": {}
      }
    };
    config.runtimeDataModel = JSON.parse('{"models":{"User":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"email","kind":"scalar","type":"String"},{"name":"role","kind":"enum","type":"Role"},{"name":"image","kind":"scalar","type":"String"},{"name":"profile","kind":"object","type":"ProviderProfile","relationName":"ProviderProfileToUser"},{"name":"orders","kind":"object","type":"Order","relationName":"OrderToUser"},{"name":"reviews","kind":"object","type":"Review","relationName":"ReviewToUser"},{"name":"emailVerified","kind":"scalar","type":"Boolean"},{"name":"phone","kind":"scalar","type":"String"},{"name":"status","kind":"enum","type":"UserStatus"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"sessions","kind":"object","type":"Session","relationName":"SessionToUser"},{"name":"accounts","kind":"object","type":"Account","relationName":"AccountToUser"},{"name":"carts","kind":"object","type":"Cart","relationName":"CartToUser"}],"dbName":"user"},"ProviderProfile":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"businessName","kind":"scalar","type":"String"},{"name":"description","kind":"scalar","type":"String"},{"name":"address","kind":"scalar","type":"String"},{"name":"contactNumber","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"user","kind":"object","type":"User","relationName":"ProviderProfileToUser"},{"name":"meals","kind":"object","type":"Meal","relationName":"MealToProviderProfile"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":null},"Category":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"meals","kind":"object","type":"Meal","relationName":"CategoryToMeal"}],"dbName":null},"Meal":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"description","kind":"scalar","type":"String"},{"name":"price","kind":"scalar","type":"Float"},{"name":"image","kind":"scalar","type":"String"},{"name":"isAvailable","kind":"scalar","type":"Boolean"},{"name":"categoryId","kind":"scalar","type":"String"},{"name":"category","kind":"object","type":"Category","relationName":"CategoryToMeal"},{"name":"providerProfileId","kind":"scalar","type":"String"},{"name":"provider","kind":"object","type":"ProviderProfile","relationName":"MealToProviderProfile"},{"name":"orderItems","kind":"object","type":"OrderItem","relationName":"MealToOrderItem"},{"name":"reviews","kind":"object","type":"Review","relationName":"MealToReview"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"cartItems","kind":"object","type":"CartItem","relationName":"CartItemToMeal"}],"dbName":null},"Order":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"status","kind":"enum","type":"OrderStatus"},{"name":"totalPrice","kind":"scalar","type":"Float"},{"name":"customerId","kind":"scalar","type":"String"},{"name":"customer","kind":"object","type":"User","relationName":"OrderToUser"},{"name":"items","kind":"object","type":"OrderItem","relationName":"OrderToOrderItem"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":null},"OrderItem":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"orderId","kind":"scalar","type":"String"},{"name":"order","kind":"object","type":"Order","relationName":"OrderToOrderItem"},{"name":"mealId","kind":"scalar","type":"String"},{"name":"meal","kind":"object","type":"Meal","relationName":"MealToOrderItem"},{"name":"quantity","kind":"scalar","type":"Int"},{"name":"price","kind":"scalar","type":"Float"},{"name":"address","kind":"scalar","type":"String"}],"dbName":null},"Cart":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"user","kind":"object","type":"User","relationName":"CartToUser"},{"name":"items","kind":"object","type":"CartItem","relationName":"CartToCartItem"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"cart"},"CartItem":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"cartId","kind":"scalar","type":"String"},{"name":"cart","kind":"object","type":"Cart","relationName":"CartToCartItem"},{"name":"mealId","kind":"scalar","type":"String"},{"name":"meal","kind":"object","type":"Meal","relationName":"CartItemToMeal"},{"name":"quantity","kind":"scalar","type":"Int"},{"name":"price","kind":"scalar","type":"Float"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"cart_item"},"Review":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"rating","kind":"scalar","type":"Int"},{"name":"comment","kind":"scalar","type":"String"},{"name":"customerId","kind":"scalar","type":"String"},{"name":"customer","kind":"object","type":"User","relationName":"ReviewToUser"},{"name":"mealId","kind":"scalar","type":"String"},{"name":"meal","kind":"object","type":"Meal","relationName":"MealToReview"},{"name":"createdAt","kind":"scalar","type":"DateTime"}],"dbName":null},"Session":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"expiresAt","kind":"scalar","type":"DateTime"},{"name":"token","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"ipAddress","kind":"scalar","type":"String"},{"name":"userAgent","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"user","kind":"object","type":"User","relationName":"SessionToUser"}],"dbName":"session"},"Account":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"accountId","kind":"scalar","type":"String"},{"name":"providerId","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"user","kind":"object","type":"User","relationName":"AccountToUser"},{"name":"accessToken","kind":"scalar","type":"String"},{"name":"refreshToken","kind":"scalar","type":"String"},{"name":"idToken","kind":"scalar","type":"String"},{"name":"accessTokenExpiresAt","kind":"scalar","type":"DateTime"},{"name":"refreshTokenExpiresAt","kind":"scalar","type":"DateTime"},{"name":"scope","kind":"scalar","type":"String"},{"name":"password","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"account"},"Verification":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"identifier","kind":"scalar","type":"String"},{"name":"value","kind":"scalar","type":"String"},{"name":"expiresAt","kind":"scalar","type":"DateTime"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"verification"}},"enums":{},"types":{}}');
    config.compilerWasm = {
      getRuntime: async () => await import("@prisma/client/runtime/query_compiler_fast_bg.postgresql.mjs"),
      getQueryCompilerWasmModule: async () => {
        const { wasm } = await import("@prisma/client/runtime/query_compiler_fast_bg.postgresql.wasm-base64.mjs");
        return await decodeBase64AsWasm(wasm);
      },
      importName: "./query_compiler_fast_bg.js"
    };
  }
});

// generated/prisma/internal/prismaNamespace.ts
import * as runtime2 from "@prisma/client/runtime/client";
var getExtensionContext, NullTypes2, TransactionIsolationLevel, defineExtension;
var init_prismaNamespace = __esm({
  "generated/prisma/internal/prismaNamespace.ts"() {
    "use strict";
    getExtensionContext = runtime2.Extensions.getExtensionContext;
    NullTypes2 = {
      DbNull: runtime2.NullTypes.DbNull,
      JsonNull: runtime2.NullTypes.JsonNull,
      AnyNull: runtime2.NullTypes.AnyNull
    };
    TransactionIsolationLevel = runtime2.makeStrictEnum({
      ReadUncommitted: "ReadUncommitted",
      ReadCommitted: "ReadCommitted",
      RepeatableRead: "RepeatableRead",
      Serializable: "Serializable"
    });
    defineExtension = runtime2.Extensions.defineExtension;
  }
});

// generated/prisma/enums.ts
var init_enums = __esm({
  "generated/prisma/enums.ts"() {
    "use strict";
  }
});

// generated/prisma/client.ts
import * as path from "path";
import { fileURLToPath } from "url";
var PrismaClient;
var init_client = __esm({
  "generated/prisma/client.ts"() {
    "use strict";
    init_class();
    init_prismaNamespace();
    init_enums();
    init_enums();
    globalThis["__dirname"] = path.dirname(fileURLToPath(import.meta.url));
    PrismaClient = getPrismaClientClass();
  }
});

// src/lib/prisma.ts
import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
var connectionString, adapter, prisma;
var init_prisma = __esm({
  "src/lib/prisma.ts"() {
    "use strict";
    init_client();
    connectionString = `${process.env.DATABASE_URL}`;
    adapter = new PrismaPg({ connectionString });
    prisma = new PrismaClient({ adapter });
  }
});

// src/lib/auth.ts
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
var auth;
var init_auth = __esm({
  "src/lib/auth.ts"() {
    "use strict";
    init_prisma();
    auth = betterAuth({
      database: prismaAdapter(prisma, {
        provider: "postgresql"
      }),
      trustedOrigins: [process.env.APP_URL || "http://localhost:3000"],
      emailAndPassword: {
        enabled: true
      },
      user: {
        additionalFields: {
          role: { type: "string", isRequired: true },
          status: { type: "string", required: true },
          phone: { type: "string", required: true }
        }
      },
      socialProviders: {
        google: {
          prompt: "select_account consent",
          accessType: "offline",
          clientId: process.env.GOOGLE_CLIENT_ID,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET
        }
      }
    });
  }
});

// src/lib/middlewares/notFound.ts
function notFound(req, res) {
  res.status(404).json({
    message: "Route not Found",
    path: req.originalUrl,
    date: Date()
  });
}
var init_notFound = __esm({
  "src/lib/middlewares/notFound.ts"() {
    "use strict";
  }
});

// src/error/AppError.ts
var AppError;
var init_AppError = __esm({
  "src/error/AppError.ts"() {
    "use strict";
    AppError = class extends Error {
      statusCode;
      constructor(message, statusCode = 400) {
        super(message);
        this.statusCode = statusCode;
        Error.captureStackTrace(this, this.constructor);
      }
    };
  }
});

// modules/meal/meal.services.ts
var getAllMeal, getMealDetails, addReview, addMeal, updateMeal, deleteMeal, Allcategories, mealServices;
var init_meal_services = __esm({
  "modules/meal/meal.services.ts"() {
    "use strict";
    init_AppError();
    init_prisma();
    getAllMeal = async (query) => {
      const { orderby = "desc", category, page = 1, limit = 10 } = query;
      const skip = (Number(page) - 1) * Number(limit);
      const take = Number(limit);
      const data = await prisma.meal.findMany({
        where: {
          ...category && {
            category: {
              name: category
            }
          }
        },
        orderBy: {
          price: orderby === "asc" ? "asc" : "desc"
        },
        skip,
        take,
        include: {
          category: true,
          provider: {
            omit: {
              updatedAt: true,
              createdAt: true
            }
          },
          reviews: true
        }
      });
      const total = await prisma.meal.count({
        where: {
          ...category && {
            category: {
              name: category
            }
          }
        }
      });
      return {
        meals: data,
        pagination: {
          total,
          page: Number(page),
          limit: Number(limit),
          totalPages: Math.ceil(total / Number(limit))
        }
      };
    };
    getMealDetails = async (id) => {
      const data = await prisma.meal.findUnique({
        where: {
          id
        },
        include: {
          provider: {
            omit: {
              createdAt: true,
              updatedAt: true
            }
          },
          reviews: {
            orderBy: {
              createdAt: "desc"
            },
            include: {
              customer: {
                select: {
                  email: true,
                  name: true,
                  image: true
                }
              }
            }
          }
        }
      });
      return data;
    };
    addReview = async (bodyData) => {
      console.log(bodyData);
      const { rating, mealId, comment, customerId } = bodyData;
      if (!rating || !mealId || !comment) {
        throw new Error("Rating, comment, and mealId are required");
      }
      const review = await prisma.review.create({
        data: {
          rating,
          comment,
          customerId,
          mealId
        },
        include: {
          meal: true,
          customer: true
        }
      });
      console.log(review);
      return review;
    };
    addMeal = async (bodyData, user) => {
      const { id } = user;
      const findProviderId = await prisma.providerProfile.findFirstOrThrow({
        where: {
          userId: id
        }
      });
      console.log(findProviderId);
      const newData = { ...bodyData, providerProfileId: findProviderId.id };
      const data = await prisma.meal.create({
        data: newData
      });
      return data;
    };
    updateMeal = async (bodyData, user, mealId) => {
      const { id: userId } = user;
      console.log("id", userId);
      console.log("Mealid", mealId);
      console.log("bodyData", bodyData);
      const provider = await prisma.providerProfile.findUniqueOrThrow({
        where: {
          userId
        },
        select: {
          id: true,
          userId: true
        }
      });
      console.log(provider);
      if (provider.userId !== userId) {
        throw new Error("Your are not the author of this Meal");
      }
      const updateMealData = await prisma.meal.update({
        where: {
          id: mealId
        },
        data: bodyData
      });
      return updateMealData;
    };
    deleteMeal = async (user, mealId) => {
      const { id: userId } = user;
      console.log("id", userId);
      console.log("Mealid", mealId);
      const provider = await prisma.providerProfile.findUniqueOrThrow({
        where: {
          userId
        },
        select: {
          id: true,
          userId: true
        }
      });
      if (provider.userId !== userId) {
        throw new AppError("Your are not the author of this Meal", 403);
      }
      const updateMealData = await prisma.meal.delete({
        where: {
          id: mealId
        }
      });
      return updateMealData;
    };
    Allcategories = async () => {
      const data = await prisma.category.findMany({
        include: {
          meals: true
        }
      });
      return data;
    };
    mealServices = {
      getAllMeal,
      getMealDetails,
      addMeal,
      updateMeal,
      deleteMeal,
      Allcategories,
      addReview
    };
  }
});

// modules/meal/meal.controllers.ts
var getMeal, addReview2, getMealDetails2, addMeal2, updateMeal2, deleteMeal2, Allcategories2, mealController;
var init_meal_controllers = __esm({
  "modules/meal/meal.controllers.ts"() {
    "use strict";
    init_meal_services();
    getMeal = async (req, res) => {
      try {
        const data = await mealServices.getAllMeal(req.query);
        res.status(200).json({
          success: true,
          ok: true,
          data
        });
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Failed to Get Meal";
        res.status(500).json(
          {
            success: false,
            data: null,
            error: errorMessage
          }
        );
      }
    };
    addReview2 = async (req, res) => {
      try {
        const data = await mealServices.addReview(req.body);
        res.status(200).json({
          success: true,
          ok: true,
          data
        });
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Failed to Post Meal Review";
        res.status(500).json(
          {
            success: false,
            data: null,
            error: errorMessage
          }
        );
      }
    };
    getMealDetails2 = async (req, res) => {
      const { id } = req.params;
      try {
        const data = await mealServices.getMealDetails(id);
        res.status(200).json({
          success: true,
          ok: true,
          data
        });
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Failed to Get Meal Details";
        res.status(500).json(
          {
            success: false,
            data: null,
            error: errorMessage
          }
        );
      }
    };
    addMeal2 = async (req, res) => {
      try {
        const data = await mealServices.addMeal(req.body, req.user);
        res.status(200).json({
          success: true,
          ok: true,
          data
        });
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Failed to Add Meal";
        res.status(500).json(
          {
            success: false,
            data: null,
            error: errorMessage
          }
        );
      }
    };
    updateMeal2 = async (req, res) => {
      try {
        const data = await mealServices.updateMeal(req.body, req.user, req.params.id);
        res.status(200).json({
          success: true,
          ok: true,
          data
        });
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Failed to Update Meal";
        res.status(500).json(
          {
            success: false,
            data: null,
            error: errorMessage
          }
        );
      }
    };
    deleteMeal2 = async (req, res) => {
      try {
        const data = await mealServices.deleteMeal(req.user, req.params.id);
        res.status(200).json({
          success: true,
          ok: true,
          data
        });
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Failed to Delete Meal";
        res.status(500).json(
          {
            success: false,
            data: null,
            error: errorMessage
          }
        );
      }
    };
    Allcategories2 = async (req, res) => {
      try {
        const data = await mealServices.Allcategories();
        res.status(200).json({
          success: true,
          ok: true,
          data
        });
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Failed to Get Meal";
        res.status(500).json(
          {
            success: false,
            data: null,
            error: errorMessage
          }
        );
      }
    };
    mealController = {
      getMeal,
      getMealDetails: getMealDetails2,
      addMeal: addMeal2,
      updateMeal: updateMeal2,
      deleteMeal: deleteMeal2,
      Allcategories: Allcategories2,
      addReview: addReview2
    };
  }
});

// src/lib/middlewares/auth.ts
var auth2, auth_default;
var init_auth2 = __esm({
  "src/lib/middlewares/auth.ts"() {
    "use strict";
    init_auth();
    auth2 = (...role) => {
      return async (req, res, next) => {
        const session = await auth.api.getSession({
          headers: req.headers
        });
        if (!session || !session.user) {
          return res.status(401).json({ error: "Unauthorized" });
        }
        req.user = {
          id: session.user.id,
          email: session.user.email,
          name: session.user.name,
          role: session.user.role,
          emailVerified: session.user.emailVerified,
          status: session.user.status
        };
        if (role.length > 0 && (!req.user.role || !role.includes(req.user.role))) {
          return res.status(403).json({ error: "Forbidden" });
        }
        next();
      };
    };
    auth_default = auth2;
  }
});

// modules/meal/meal.routes.ts
import express from "express";
var router, mealRouter;
var init_meal_routes = __esm({
  "modules/meal/meal.routes.ts"() {
    "use strict";
    init_meal_controllers();
    init_auth2();
    router = express.Router();
    router.get("/", mealController.getMeal);
    router.get("/categories", mealController.Allcategories);
    router.get("/:id", mealController.getMealDetails);
    router.post("/add-meal", auth_default("PROVIDER" /* PROVIDER */), mealController.addMeal);
    router.post("/review", mealController.addReview);
    router.patch("/update-meal/:id", auth_default("PROVIDER" /* PROVIDER */), mealController.updateMeal);
    router.delete("/delete-meal/:id", auth_default("PROVIDER" /* PROVIDER */), mealController.deleteMeal);
    mealRouter = router;
  }
});

// modules/order/order.services.ts
var getAllOrder, postOrder, getOrders, singleOrderDetails, updateOrder, orderServices;
var init_order_services = __esm({
  "modules/order/order.services.ts"() {
    "use strict";
    init_prisma();
    getAllOrder = async (user) => {
      const providerProfile = await prisma.providerProfile.findUniqueOrThrow({
        where: {
          userId: user.id
        }
      });
      const data = await prisma.orderItem.findMany({
        where: {
          meal: {
            providerProfileId: providerProfile.id
          }
        },
        include: {
          meal: true,
          order: {
            include: {
              customer: {
                select: {
                  id: true,
                  name: true,
                  email: true
                }
              }
            }
          }
        }
      });
      return data;
    };
    postOrder = async (user, bodyData) => {
      const address = { address: bodyData.address };
      const order = await prisma.order.create({
        data: {
          customerId: user.id,
          totalPrice: bodyData.totalPrice
        }
      });
      const orderItemsData = bodyData.items.map((item) => ({
        orderId: order.id,
        mealId: item.mealId,
        quantity: item.quantity,
        price: item.price,
        address: bodyData.address
      }));
      const ress = await prisma.orderItem.createMany({
        data: orderItemsData
      });
      console.log(ress);
      if (bodyData.items && bodyData.items.length > 0) {
        for (const item of bodyData.items) {
          if (item.id) {
            await prisma.cartItem.delete({
              where: { id: item.id }
            }).catch(() => null);
          } else if (item.cartId) {
            await prisma.cartItem.deleteMany({
              where: { cartId: item.cartId }
            });
          }
        }
      }
      return prisma.order.findUnique({
        where: { id: order.id },
        include: {
          items: {
            include: {
              meal: true
            }
          }
        }
      });
    };
    getOrders = async (user) => {
      return prisma.order.findMany({
        where: {
          customerId: user.id
        },
        orderBy: {
          createdAt: "desc"
        },
        include: {
          items: {
            include: {
              meal: {
                select: {
                  id: true,
                  name: true,
                  price: true,
                  image: true
                }
              }
            }
          }
        }
      });
    };
    singleOrderDetails = async (user, id) => {
      const order = await prisma.order.findUniqueOrThrow({
        where: {
          id
        },
        include: {
          customer: {
            select: {
              id: true,
              name: true,
              email: true
            }
          },
          items: {
            include: {
              meal: true
            }
          }
        }
      });
      if (order.customerId !== user.id && user.role !== "ADMIN") {
        throw new Error("You are not allowed to view this order");
      }
      return order;
    };
    updateOrder = async (bodyData, id) => {
      const updatedOrder = await prisma.order.update({
        where: {
          id
        },
        data: bodyData
      });
      return updatedOrder;
    };
    orderServices = {
      getAllOrder,
      updateOrder,
      postOrder,
      getOrders,
      singleOrderDetails
    };
  }
});

// modules/order/order.controller.ts
var getAllOrder2, postOrder2, getOrders2, singleOrderDetails2, updateOrder2, orderController;
var init_order_controller = __esm({
  "modules/order/order.controller.ts"() {
    "use strict";
    init_order_services();
    getAllOrder2 = async (req, res) => {
      try {
        const data = await orderServices.getAllOrder(req.user);
        res.status(200).json({
          success: true,
          ok: true,
          data
        });
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Failed to Get Order";
        res.status(500).json(
          {
            success: false,
            data: null,
            error: errorMessage
          }
        );
      }
    };
    postOrder2 = async (req, res) => {
      try {
        const data = await orderServices.postOrder(req.user, req.body);
        res.status(200).json({
          success: true,
          ok: true,
          data
        });
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Failed to Post Order";
        res.status(500).json(
          {
            success: false,
            data: null,
            error: errorMessage
          }
        );
      }
    };
    getOrders2 = async (req, res) => {
      try {
        const data = await orderServices.getOrders(req.user);
        res.status(200).json({
          success: true,
          ok: true,
          data
        });
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Failed to Fetch Order";
        res.status(500).json(
          {
            success: false,
            data: null,
            error: errorMessage
          }
        );
      }
    };
    singleOrderDetails2 = async (req, res) => {
      const { id } = req.params;
      try {
        const data = await orderServices.singleOrderDetails(req.user, id);
        res.status(200).json({
          success: true,
          ok: true,
          data
        });
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Failed to Fetch Order";
        res.status(500).json(
          {
            success: false,
            data: null,
            error: errorMessage
          }
        );
      }
    };
    updateOrder2 = async (req, res) => {
      const { id } = req.params;
      try {
        const data = await orderServices.updateOrder(req.body, id);
        res.status(200).json({
          success: true,
          ok: true,
          data
        });
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Failed to Get Order";
        res.status(500).json(
          {
            success: false,
            data: null,
            error: errorMessage
          }
        );
      }
    };
    orderController = {
      getAllOrder: getAllOrder2,
      updateOrder: updateOrder2,
      postOrder: postOrder2,
      getOrders: getOrders2,
      singleOrderDetails: singleOrderDetails2
    };
  }
});

// modules/order/order.routes.ts
import express2 from "express";
var router2, orderRouter;
var init_order_routes = __esm({
  "modules/order/order.routes.ts"() {
    "use strict";
    init_auth2();
    init_order_controller();
    router2 = express2.Router();
    router2.get("/provider", auth_default("PROVIDER" /* PROVIDER */), orderController.getAllOrder);
    router2.patch("/provider/update-order/:id", auth_default("PROVIDER" /* PROVIDER */), orderController.updateOrder);
    router2.post("/", auth_default("CUSTOMER" /* CUSTOMER */), orderController.postOrder);
    router2.get("/customer", auth_default("CUSTOMER" /* CUSTOMER */), orderController.getOrders);
    router2.get("/:id", auth_default("CUSTOMER" /* CUSTOMER */), orderController.singleOrderDetails);
    orderRouter = router2;
  }
});

// modules/admin/admin.services.ts
var adminStats, getAllUsers, getAllOrders, Allcategories3, getAllReviews, deleteReview, updateUserStatus, addCategory, adminService;
var init_admin_services = __esm({
  "modules/admin/admin.services.ts"() {
    "use strict";
    init_prisma();
    adminStats = async () => {
      const [
        totalUsers,
        totalCustomers,
        totalProviders,
        activeUsers,
        totalMeals,
        availableMeals,
        unavailableMeals,
        totalOrders,
        ordersByStatus,
        revenueResult,
        providersWithMeals,
        totalProviderProfiles
      ] = await Promise.all([
        prisma.user.count(),
        prisma.user.count({ where: { role: "CUSTOMER" } }),
        prisma.user.count({ where: { role: "PROVIDER" } }),
        prisma.user.count({ where: { status: "ACTIVE" } }),
        prisma.meal.count(),
        prisma.meal.count({ where: { isAvailable: true } }),
        prisma.meal.count({ where: { isAvailable: false } }),
        prisma.order.count(),
        prisma.order.groupBy({
          by: ["status"],
          _count: { status: true }
        }),
        prisma.order.aggregate({
          _sum: { totalPrice: true }
        }),
        prisma.providerProfile.count({
          where: {
            meals: {
              some: {}
            }
          }
        }),
        prisma.providerProfile.count()
      ]);
      return {
        users: {
          total: totalUsers,
          customers: totalCustomers,
          providers: totalProviders,
          active: activeUsers
        },
        meals: {
          total: totalMeals,
          available: availableMeals,
          unavailable: unavailableMeals
        },
        orders: {
          total: totalOrders,
          byStatus: ordersByStatus.map((o) => ({
            status: o.status,
            count: o._count.status
          })),
          totalRevenue: revenueResult._sum.totalPrice || 0
        },
        providers: {
          total: totalProviderProfiles,
          withMeals: providersWithMeals,
          withoutMeals: totalProviderProfiles - providersWithMeals
        }
      };
    };
    getAllUsers = async () => {
      const data = await prisma.user.findMany({
        where: {
          OR: [
            { role: "CUSTOMER" },
            { role: "PROVIDER" }
          ]
        }
      });
      return data;
    };
    getAllOrders = async () => {
      const order = await prisma.order.findMany({
        include: {
          customer: true
        }
      });
      const orderItem = await prisma.orderItem.findMany({
        include: {
          meal: {
            include: {
              provider: true
            }
          }
        }
      });
      return { order, orderItem };
    };
    Allcategories3 = async () => {
      const data = await prisma.category.findMany({
        include: {
          meals: true
        }
      });
      return data;
    };
    getAllReviews = async () => {
      const data = await prisma.review.findMany({
        include: {
          customer: true,
          meal: true
        }
      });
      return data;
    };
    deleteReview = async (id) => {
      const data = await prisma.review.delete({
        where: {
          id
        }
      });
      return data;
    };
    updateUserStatus = async (bodyData, id) => {
      const data = await prisma.user.update({
        where: {
          id
        },
        data: bodyData
      });
      return data;
    };
    addCategory = async (bodyData) => {
      const getCategory = await prisma.category.findUnique({
        where: {
          id: bodyData.id
        }
      });
      if (getCategory?.id === bodyData.id) {
        throw new Error("Category Already Exists");
      }
      const data = await prisma.category.create({
        data: bodyData
      });
      return data;
    };
    adminService = {
      getAllUsers,
      addCategory,
      updateUserStatus,
      getAllOrders,
      Allcategories: Allcategories3,
      adminStats,
      getAllReviews,
      deleteReview
    };
  }
});

// modules/admin/admin.controllers.ts
var adminStats2, addCategory2, getAllReviews2, deleteReview2, getAllUsers2, getAllOrders2, Allcategories4, updateUserStatus2, adminController;
var init_admin_controllers = __esm({
  "modules/admin/admin.controllers.ts"() {
    "use strict";
    init_admin_services();
    adminStats2 = async (req, res) => {
      try {
        const data = await adminService.adminStats();
        res.status(200).json({
          success: true,
          ok: true,
          data
        });
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Failed to Fetch Stats";
        res.status(500).json(
          {
            success: false,
            data: null,
            error: errorMessage
          }
        );
      }
    };
    addCategory2 = async (req, res) => {
      try {
        const data = await adminService.addCategory(req.body);
        res.status(200).json({
          success: true,
          ok: true,
          data
        });
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Failed to add Category";
        res.status(500).json(
          {
            success: false,
            data: null,
            error: errorMessage
          }
        );
      }
    };
    getAllReviews2 = async (req, res) => {
      try {
        const data = await adminService.getAllReviews();
        res.status(200).json({
          success: true,
          ok: true,
          data
        });
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Failed to Get Meal";
        res.status(500).json(
          {
            success: false,
            data: null,
            error: errorMessage
          }
        );
      }
    };
    deleteReview2 = async (req, res) => {
      const { id } = req.params;
      try {
        const data = await adminService.deleteReview(id);
        res.status(200).json({
          success: true,
          ok: true,
          data
        });
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Failed to Get Meal";
        res.status(500).json(
          {
            success: false,
            data: null,
            error: errorMessage
          }
        );
      }
    };
    getAllUsers2 = async (req, res) => {
      try {
        const data = await adminService.getAllUsers();
        res.status(200).json({
          success: true,
          ok: true,
          data
        });
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Failed to Get Meal";
        res.status(500).json(
          {
            success: false,
            data: null,
            error: errorMessage
          }
        );
      }
    };
    getAllOrders2 = async (req, res) => {
      try {
        const data = await adminService.getAllOrders();
        res.status(200).json({
          success: true,
          ok: true,
          data
        });
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Failed to Get Meal";
        res.status(500).json(
          {
            success: false,
            data: null,
            error: errorMessage
          }
        );
      }
    };
    Allcategories4 = async (req, res) => {
      try {
        const data = await adminService.Allcategories();
        res.status(200).json({
          success: true,
          ok: true,
          data
        });
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Failed to Get Meal";
        res.status(500).json(
          {
            success: false,
            data: null,
            error: errorMessage
          }
        );
      }
    };
    updateUserStatus2 = async (req, res) => {
      const { id } = req.params;
      try {
        const data = await adminService.updateUserStatus(req.body, id);
        res.status(200).json({
          success: true,
          ok: true,
          data
        });
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Failed to Update User";
        res.status(500).json(
          {
            success: false,
            data: null,
            error: errorMessage
          }
        );
      }
    };
    adminController = {
      getAllUsers: getAllUsers2,
      addCategory: addCategory2,
      updateUserStatus: updateUserStatus2,
      getAllOrders: getAllOrders2,
      Allcategories: Allcategories4,
      adminStats: adminStats2,
      getAllReviews: getAllReviews2,
      deleteReview: deleteReview2
    };
  }
});

// modules/admin/admin.routes.ts
import express3 from "express";
var router3, adminRouter;
var init_admin_routes = __esm({
  "modules/admin/admin.routes.ts"() {
    "use strict";
    init_admin_controllers();
    init_auth2();
    router3 = express3.Router();
    router3.get("/", auth_default("ADMIN" /* ADMIN */), adminController.adminStats);
    router3.get("/all-reviews", adminController.getAllReviews);
    router3.get("/all-categories", auth_default("ADMIN" /* ADMIN */), adminController.Allcategories);
    router3.get("/all-users", auth_default("ADMIN" /* ADMIN */), adminController.getAllUsers);
    router3.get("/all-orders", auth_default("ADMIN" /* ADMIN */), adminController.getAllOrders);
    router3.post("/add-category", auth_default("ADMIN" /* ADMIN */), adminController.addCategory);
    router3.patch("/update-user/:id", auth_default("ADMIN" /* ADMIN */), adminController.updateUserStatus);
    router3.delete("/delete-reviews/:id", auth_default("ADMIN" /* ADMIN */), adminController.deleteReview);
    adminRouter = router3;
  }
});

// modules/customer/customer.service.ts
var customerOrders, customerStat, customerService;
var init_customer_service = __esm({
  "modules/customer/customer.service.ts"() {
    "use strict";
    init_prisma();
    customerOrders = async (user) => {
      const data = await prisma.order.findMany({
        where: {
          id: user.id
        }
      });
      return data;
    };
    customerStat = async (user) => {
      const orders = await prisma.order.findMany({
        where: { customerId: user.id },
        include: {
          items: {
            include: { meal: true }
          }
        }
      });
      let totalSpent = 0;
      let totalMealsOrdered = 0;
      orders.forEach((order) => {
        order.items.forEach((item) => {
          totalSpent += item.price;
          totalMealsOrdered += item.quantity;
        });
      });
      const reviews = await prisma.review.findMany({
        where: { customerId: user.id },
        include: { meal: true }
      });
      return {
        totalOrders: orders.length,
        totalSpent,
        totalMealsOrdered,
        orders,
        reviews
      };
    };
    customerService = {
      customerOrders,
      customerStat
    };
  }
});

// modules/customer/customer.controller.ts
var customerOrders2, customerStat2, customerController;
var init_customer_controller = __esm({
  "modules/customer/customer.controller.ts"() {
    "use strict";
    init_customer_service();
    customerOrders2 = async (req, res) => {
      try {
        const data = await customerService.customerOrders(req.user);
        res.status(200).json({
          success: true,
          ok: true,
          data
        });
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Failed to Fetch Orders";
        res.status(500).json(
          {
            success: false,
            data: null,
            error: errorMessage
          }
        );
      }
    };
    customerStat2 = async (req, res) => {
      try {
        const data = await customerService.customerStat(req.user);
        res.status(200).json({
          success: true,
          ok: true,
          data
        });
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Failed to Fetch Orders";
        res.status(500).json(
          {
            success: false,
            data: null,
            error: errorMessage
          }
        );
      }
    };
    customerController = {
      customerOrders: customerOrders2,
      customerStat: customerStat2
    };
  }
});

// modules/customer/customer.routes.ts
import express4 from "express";
var router4, customerRouter;
var init_customer_routes = __esm({
  "modules/customer/customer.routes.ts"() {
    "use strict";
    init_auth2();
    init_customer_controller();
    router4 = express4.Router();
    router4.get("/orders", auth_default("CUSTOMER" /* CUSTOMER */), customerController.customerOrders);
    router4.get("/stats", auth_default("CUSTOMER" /* CUSTOMER */), customerController.customerStat);
    customerRouter = router4;
  }
});

// modules/providers/provider.service.ts
var providerStats, getAllProvider, providerDetails, providerServices;
var init_provider_service = __esm({
  "modules/providers/provider.service.ts"() {
    "use strict";
    init_prisma();
    providerStats = async (user) => {
      console.log(user);
      const provider = await prisma.providerProfile.findUniqueOrThrow({
        where: {
          userId: user.id
        }
      });
      const [
        totalMeals,
        availableMeals,
        unavailableMeals,
        orderItems,
        revenueResult,
        reviewAggregate
      ] = await Promise.all([
        prisma.meal.count({
          where: { providerProfileId: provider.id }
        }),
        prisma.meal.count({
          where: {
            providerProfileId: provider.id,
            isAvailable: true
          }
        }),
        prisma.meal.count({
          where: {
            providerProfileId: provider.id,
            isAvailable: false
          }
        }),
        prisma.orderItem.findMany({
          where: {
            meal: {
              providerProfileId: provider.id
            }
          },
          include: {
            order: true
          }
        }),
        prisma.orderItem.aggregate({
          where: {
            meal: {
              providerProfileId: provider.id
            }
          },
          _sum: { price: true }
        }),
        prisma.review.aggregate({
          where: {
            meal: {
              providerProfileId: provider.id
            }
          },
          _count: { id: true },
          _avg: { rating: true }
        })
      ]);
      const uniqueOrders = new Set(orderItems.map((i) => i.orderId));
      const uniqueCustomers = new Set(
        orderItems.map((i) => i.order.customerId)
      );
      return {
        meals: {
          total: totalMeals,
          available: availableMeals,
          unavailable: unavailableMeals
        },
        orders: {
          totalOrderItems: orderItems.length,
          totalOrders: uniqueOrders.size,
          revenue: revenueResult._sum.price || 0
        },
        customers: {
          unique: uniqueCustomers.size
        },
        reviews: {
          total: reviewAggregate._count.id,
          averageRating: Number(
            (reviewAggregate._avg.rating || 0).toFixed(1)
          )
        }
      };
    };
    getAllProvider = async () => {
      const data = await prisma.providerProfile.findMany({
        include: {
          user: true,
          meals: true
        }
      });
      return data;
    };
    providerDetails = async (id) => {
      const data = await prisma.providerProfile.findUniqueOrThrow({
        where: {
          id
        },
        include: {
          user: true,
          meals: true
        }
      });
      return data;
    };
    providerServices = {
      getAllProvider,
      providerDetails,
      providerStats
    };
  }
});

// modules/providers/provider.controller.ts
var providerStats2, getAllProvider2, providerDetails2, providerController;
var init_provider_controller = __esm({
  "modules/providers/provider.controller.ts"() {
    "use strict";
    init_provider_service();
    providerStats2 = async (req, res) => {
      try {
        const data = await providerServices.providerStats(req.user);
        res.status(200).json({
          success: true,
          ok: true,
          data
        });
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Failed to Get Provider Stats";
        res.status(500).json(
          {
            success: false,
            data: null,
            error: errorMessage
          }
        );
      }
    };
    getAllProvider2 = async (req, res) => {
      try {
        const data = await providerServices.getAllProvider();
        res.status(200).json({
          success: true,
          ok: true,
          data
        });
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Failed to Get Order";
        res.status(500).json(
          {
            success: false,
            data: null,
            error: errorMessage
          }
        );
      }
    };
    providerDetails2 = async (req, res) => {
      const { id } = req.params;
      try {
        const data = await providerServices.providerDetails(id);
        res.status(200).json({
          success: true,
          ok: true,
          data
        });
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Failed to Get Order";
        res.status(500).json(
          {
            success: false,
            data: null,
            error: errorMessage
          }
        );
      }
    };
    providerController = {
      getAllProvider: getAllProvider2,
      providerDetails: providerDetails2,
      providerStats: providerStats2
    };
  }
});

// modules/providers/provider.routes.ts
import express5 from "express";
var router5, providerRouter;
var init_provider_routes = __esm({
  "modules/providers/provider.routes.ts"() {
    "use strict";
    init_auth2();
    init_provider_controller();
    router5 = express5.Router();
    router5.get("/provider/stats", auth_default("PROVIDER" /* PROVIDER */), providerController.providerStats);
    router5.get("/", providerController.getAllProvider);
    router5.get("/:id", providerController.providerDetails);
    providerRouter = router5;
  }
});

// modules/userProfile/userProfile.services.ts
var userProfile, updateUserProfile, userProfileService;
var init_userProfile_services = __esm({
  "modules/userProfile/userProfile.services.ts"() {
    "use strict";
    init_prisma();
    userProfile = async (user) => {
      const data = await prisma.user.findUnique({
        where: {
          id: user.id
        }
      });
      return data;
    };
    updateUserProfile = async (bodyData, user) => {
      const updateData = {
        name: bodyData.name,
        phone: bodyData.phone,
        image: bodyData.image
      };
      if (bodyData.email) {
        if (bodyData.email !== user.email) {
          throw new Error("You Are not authorized to update this info");
        }
      }
      const data = await prisma.user.update({
        where: {
          email: user.email
        },
        data: updateData
      });
      return data;
    };
    userProfileService = {
      userProfile,
      updateUserProfile
    };
  }
});

// modules/userProfile/userProfile.controller.ts
var userProfile2, updateUserProfile2, userProfileController;
var init_userProfile_controller = __esm({
  "modules/userProfile/userProfile.controller.ts"() {
    "use strict";
    init_userProfile_services();
    userProfile2 = async (req, res) => {
      try {
        const data = await userProfileService.userProfile(req.user);
        res.status(200).json({
          success: true,
          ok: true,
          data
        });
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Failed to Fetch User Profile";
        res.status(500).json(
          {
            success: false,
            data: null,
            error: errorMessage
          }
        );
      }
    };
    updateUserProfile2 = async (req, res) => {
      try {
        const data = await userProfileService.updateUserProfile(req.body, req.user);
        res.status(200).json({
          success: true,
          ok: true,
          data
        });
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Failed to Fetch Orders";
        res.status(500).json(
          {
            success: false,
            data: null,
            error: errorMessage
          }
        );
      }
    };
    userProfileController = {
      userProfile: userProfile2,
      updateUserProfile: updateUserProfile2
    };
  }
});

// modules/userProfile/userProfile.routes.ts
import express6 from "express";
var router6, userProfileRouter;
var init_userProfile_routes = __esm({
  "modules/userProfile/userProfile.routes.ts"() {
    "use strict";
    init_auth2();
    init_userProfile_controller();
    router6 = express6.Router();
    router6.get("/", auth_default("ADMIN" /* ADMIN */, "CUSTOMER" /* CUSTOMER */, "PROVIDER" /* PROVIDER */), userProfileController.userProfile);
    router6.patch("/update", auth_default("ADMIN" /* ADMIN */, "CUSTOMER" /* CUSTOMER */, "PROVIDER" /* PROVIDER */), userProfileController.updateUserProfile);
    userProfileRouter = router6;
  }
});

// modules/cart/cart.services.ts
var addToCart, getCart, deleteFromCart, clearCart, cartService;
var init_cart_services = __esm({
  "modules/cart/cart.services.ts"() {
    "use strict";
    init_prisma();
    addToCart = async (bodyData, userId) => {
      const { mealId, quantity } = bodyData;
      const cart = await prisma.cart.create({
        data: { userId }
      });
      const meal = await prisma.meal.findUnique({
        where: { id: mealId }
      });
      if (!meal) {
        throw new Error("Meal not found");
      }
      const isExist = await prisma.cartItem.findUnique({
        where: {
          id: mealId
        }
      });
      if (isExist) {
        throw new Error("Meal Already added to Card");
      }
      const cartItem = await prisma.cartItem.create({
        data: {
          cartId: cart.id,
          mealId,
          quantity,
          price: meal.price * quantity
        }
      });
      return cartItem;
    };
    getCart = async (user) => {
      const data = await prisma.cart.findMany({
        where: {
          userId: user.id
        },
        include: {
          items: {
            include: {
              meal: true
            }
          }
        }
      });
      return data;
    };
    deleteFromCart = async (itemId) => {
      return await prisma.cartItem.delete({
        where: {
          id: itemId
        }
      });
    };
    clearCart = async (orderData) => {
      try {
        const cartIds = [...new Set(orderData.items.map((item) => item.cartId))];
        console.log(cartIds);
        if (cartIds.length === 0) return;
        const result = await prisma.cartItem.deleteMany({
          where: {
            cartId: {
              in: cartIds
            }
          }
        });
        return result;
      } catch (error) {
        console.error("Error clearing cart:", error);
        throw error;
      }
    };
    cartService = {
      addToCart,
      getCart,
      deleteFromCart,
      clearCart
    };
  }
});

// modules/cart/cart.controller.ts
var addToCart2, getCart2, deleteFromCart2, clearCart2, cartController;
var init_cart_controller = __esm({
  "modules/cart/cart.controller.ts"() {
    "use strict";
    init_cart_services();
    addToCart2 = async (req, res) => {
      if (!req.body.mealId || !req.body.quantity) {
        return res.status(400).json({ success: false, message: "mealId and quantity required" });
      }
      try {
        const data = await cartService.addToCart(req.body, req.user?.id);
        res.status(200).json({
          success: true,
          ok: true,
          data
        });
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Failed to add item into  cart";
        res.status(500).json(
          {
            success: false,
            data: null,
            error: errorMessage
          }
        );
      }
    };
    getCart2 = async (req, res) => {
      try {
        const data = await cartService.getCart(req.user);
        res.status(200).json({
          success: true,
          ok: true,
          data
        });
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Failed to Fetch Cart";
        res.status(500).json(
          {
            success: false,
            data: null,
            error: errorMessage
          }
        );
      }
    };
    deleteFromCart2 = async (req, res) => {
      const { id } = req.params;
      try {
        const data = await cartService.deleteFromCart(id);
        res.status(200).json({
          success: true,
          ok: true,
          data
        });
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Failed to delete Cart";
        res.status(500).json(
          {
            success: false,
            data: null,
            error: errorMessage
          }
        );
      }
    };
    clearCart2 = async (req, res) => {
      try {
        const data = await cartService.clearCart(req.body);
        res.status(200).json({
          success: true,
          ok: true,
          data
        });
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Failed to Fetch Cart";
        res.status(500).json(
          {
            success: false,
            data: null,
            error: errorMessage
          }
        );
      }
    };
    cartController = {
      getCart: getCart2,
      addToCart: addToCart2,
      deleteFromCart: deleteFromCart2,
      clearCart: clearCart2
    };
  }
});

// modules/cart/cart.routes.ts
import express7 from "express";
var router7, cartRouter;
var init_cart_routes = __esm({
  "modules/cart/cart.routes.ts"() {
    "use strict";
    init_cart_controller();
    init_auth2();
    router7 = express7.Router();
    router7.post("/", auth_default("CUSTOMER" /* CUSTOMER */), cartController.addToCart);
    router7.get("/", auth_default("CUSTOMER" /* CUSTOMER */), cartController.getCart);
    router7.delete("/:id", auth_default("CUSTOMER" /* CUSTOMER */), cartController.deleteFromCart);
    router7.delete("/clearcart", auth_default("CUSTOMER" /* CUSTOMER */), cartController.clearCart);
    cartRouter = router7;
  }
});

// modules/app.ts
import express8 from "express";
import { toNodeHandler } from "better-auth/node";
import cors from "cors";
var app, app_default;
var init_app = __esm({
  "modules/app.ts"() {
    "use strict";
    init_auth();
    init_notFound();
    init_meal_routes();
    init_order_routes();
    init_admin_routes();
    init_customer_routes();
    init_provider_routes();
    init_userProfile_routes();
    init_cart_routes();
    app = express8();
    app.use(express8.json());
    app.use(cors({
      origin: process.env.APP_URL || "http://localhost:5000",
      credentials: true
    }));
    app.all("/api/auth/*slat", toNodeHandler(auth));
    app.use("/meal", mealRouter);
    app.use("/orders", orderRouter);
    app.use("/admin", adminRouter);
    app.use("/customer", customerRouter);
    app.use("/provider", providerRouter);
    app.use("/profile", userProfileRouter);
    app.use("/cart", cartRouter);
    app.get("/", async (req, res) => {
      res.send("Hello Meal Mate Server");
    });
    app.use(notFound);
    app_default = app;
  }
});

// modules/server.ts
import "dotenv/config";
var require_server = __commonJS({
  "modules/server.ts"() {
    init_prisma();
    init_app();
    var port = process.env.PORT || 5e3;
    async function main() {
      try {
        await prisma.$connect();
        console.log("Database connected successfully...");
        app_default.listen(port, () => {
          console.log(`Server is running on http://localhost:${port}`);
        });
      } catch (error) {
        console.error("Error connecting to database:", error);
        await prisma.$disconnect();
        process.exit(1);
      }
    }
    main();
  }
});
export default require_server();
