import AdminPage from "../pages/AdminPage/AdminPage";
import CartPage from "../pages/CartPage/CartPage";
import Checkout from "../pages/Checkout/Checkout";
import HomePage from "../pages/HomePages/HomePage";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
import OrderManagementPage from "../pages/OrderManagementPage/OrderManagementPage";
import OrderPage from "../pages/OrderPages/OrderPage";
import ProductDetailPage from "../pages/ProductDetailPage/ProductDetailsPage";
import ProductManagement from "../pages/ProductManagementPage/ProductManagementPage";
import ProductPage from "../pages/ProductPages/ProductPage";
import ProfilePage from "../pages/ProfilePage/ProfilePage";
import SignInPage from "../pages/SignInPage/SignInPage";
import SignUpPage from "../pages/SignUpPage/SignUpPage";
import TypeProductPage from "../pages/TypeProductPage/TypeProductPage";

const routes =[
    {
        path: "/",
        page: HomePage,
        isShowHeader: true,
        
    },
    {
        path: "/order",
        page: OrderPage,
        isShowHeader: true,
    },
    {
        path: "/product",
        page: ProductPage,
        isShowHeader: true,
    },
    {
        path: "/cartPage",
        page: CartPage,
        isShowHeader: true,
    },
    {
        path: "/checkout",
        page: Checkout,
        isShowHeader: true,
    },
    {
        path: "/product",
        page: ProductDetailPage,
        isShowHeader: true,
    },
    {
        path: "/:type",
        page: TypeProductPage,
        isShowHeader: true,
    },
    {
        path: "/sign-in",
        page: SignInPage,
        isShowHeader: false,
    },
    {
        path: "/sign-up",
        page: SignUpPage,
        isShowHeader: false,
    },
    {
        path: "/profile-user",
        page: ProfilePage,
        isShowHeader: true,
    },
    {
        path: "/system/admin",
        page: AdminPage,
        isShowHeader: false,
        isPrivate: true,
    },
    {
        path: "/admin/product-managent",
        page: ProductManagement,
        isShowHeader: false,
    },
    {
        path: "/admin/order-managent",
        page: OrderManagementPage,
        isShowHeader: false,
    },
    {
        path: "/admin/report",
        page: ProductManagement,
        isShowHeader: false,
    },
    {
        path: "*",
        page: NotFoundPage
    }
]
export default routes