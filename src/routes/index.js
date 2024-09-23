import AdminPage from "../pages/AdminPage/AdminPage";
import DetailsOrderPage from "../pages/DetailsOrderPage/DetailsOrderPage";
import HomePage from "../pages/HomePages/HomePage";
import MyOrderPage from "../pages/MyOrder/MyOrder";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
import OrderPage from "../pages/OrderPages/OrderPage";
import OrderSucess from "../pages/OrderSuccess/OrderSuccess";
import PaymentPage from "../pages/PaymentPage/PaymentPage";
import ProductDetailPage from "../pages/ProductDetailPage/ProductDetailsPage";
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
        isShowFooter: true
        
    },
    {
        path: "/order",
        page: OrderPage,
        isShowHeader: true,
        isShowFooter: true
    },
    {
        path: "/my-order",
        page: MyOrderPage,
        isShowHeader: true,
        isShowFooter: false
    },
    {
        path: '/details-order/:id',
        page: DetailsOrderPage,
        isShowHeader: true
    },
    {
        path: "/orderSuccess",
        page: OrderSucess,
        isShowHeader: true,
        isShowFooter: false
    },
    {
        path: "/product",
        page: ProductPage,
        isShowHeader: true,
        isShowFooter: true
    },
    {
        path: "/payment",
        page: PaymentPage,
        isShowHeader: true,
        isShowFooter: true
    },
    {
        path: "/product-details/:id",
        page: ProductDetailPage,
        isShowHeader: true,
        isShowFooter: true
    },
    {
        path: "/product/:type",
        page: TypeProductPage,
        isShowHeader: true,
        isShowFooter: true
    },
    {
        path: "/sign-in",
        page: SignInPage,
        isShowHeader: false,
        isShowFooter: false
    },
    {
        path: "/sign-up",
        page: SignUpPage,
        isShowHeader: false,
        isShowFooter: false
    },
    {
        path: "/profile-user",
        page: ProfilePage,
        isShowHeader: true,
        isShowFooter: true
    },
    {
        path: "/system/admin",
        page: AdminPage,
        isShowHeader: false,
        isPrivate: true,
    },
    {
        path: "*",
        page: NotFoundPage
    }
]
export default routes