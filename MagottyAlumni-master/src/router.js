import Vue from 'vue'
import Router from 'vue-router'
import newsPage from './views/newsPage/News'
import eventsPage from "./views/eventsPage/Events"
import up_comingChild from "./views/eventsPage/components/up_comingChild"
import volunteer_Child from "./views/eventsPage/components/volunteer_child"
import alumnieventChild from "./views/eventsPage/components/alumni_event_Child"
import loginPage from './views/loginPage/Login'
import profilePage from './views/profilePage/Profile'
import registerPage from './views/registerPage/Register'
import mainPage from './views/mainPage/Main'
import userChild from "./views/profilePage/components/userChild"
import shippingChild from "./views/profilePage/components/shippingChild"
import ordersChild from "./views/profilePage/components/ordersChild"
import passwordChild from "./views/profilePage/components/passwordChild"
import portraitDescriptionChild from "./views/profilePage/components/portraitDescriptionChild"
import detailNews from "./views/newsPage/components/detailNews"
import adminPage from "./views/adminPage/Admin"
import handleNews from "./views/adminPage/components/handleNews"
import handleEvents from "./views/adminPage/components/handleEvents"
import handleOrder from "./views/adminPage/components/handleOrder"
import handleShopping from "./views/adminPage/components/handleShopping"
import handleUser from "./views/adminPage/components/handleUser"
import detailProducts from "@/views/shoppingPage/components/detailProducts";
import productsChild from "@/views/shoppingPage/components/productsChild";
import ShoppingCart from "@/views/shoppingCartPage/ShoppingCart";
import OrderPage from "@/views/shoppingCartPage/OrderPage";
import PaymentPage from "@/views/shoppingCartPage/PaymentPage";
import Donate from "@/views/donatePage/Donate";
import pay from "@/views/donatePage/components/pay";
import thanksGiving from "@/views/donatePage/components/thanksGiving";
import forgetPage from "./views/forgetPage/Forget"
import defaultChild from "./views/adminPage/components/defaultChild"
import history from "./views/historyPage/History"
import qa from "./views/Q&APage/Q&APage"
import Confirm from "@/views/shoppingCartPage/Confirm";

Vue.use(Router);

const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/admin',
            component: adminPage,
            children: [
                {
                    path: "handleNews",
                    component: handleNews,
                },
                {
                    path: "handleEvent",
                    component: handleEvents,
                },
                {
                    path: "handleShopping",
                    component: handleShopping,
                },
                {
                    path: "handleUser",
                    component: handleUser,
                },
                {
                    path: "handleOrder",
                    component: handleOrder,
                },

                {
                    path: "default",
                    component: defaultChild,
                },
                {
                    path: "",
                    redirect: '/admin/default'
                },
            ]
        },
        {
            path: '/history',
            component: history,
        },


        {
            path: '/q&a',
            component: qa,
        },
        {
            path: '/events',
            component: eventsPage,
            children: [
                {
                    path: "upcoming",
                    component: up_comingChild,
                },
                {
                    path: "volunteer",
                    component: volunteer_Child,
                },

                {
                    path: "alumnievent",
                    component: alumnieventChild,
                },
                {
                    path: "",
                    redirect: '/events/upcoming'
                },
            ]
        },
        {
            path: '/forget',
            component: forgetPage,
        },
        {
            path: '/donate',
            component: Donate,
        },
        {
            path: '/pay',
            component: pay,
        },
        {
            path: '/thanks',
            component: thanksGiving,
        },
        {
            path: '/news',
            component: newsPage,
        },
        {
            path: '/news:id',
            component: detailNews
        },
        {
            path: '/shopping',
            component: productsChild,
        },
        {
            path: '/shopping/:id',
            component: detailProducts,
        },
        {
            path:'/user',
        },
        {
            path: '/login',
            component: loginPage,
        },
        {
            path: '/profile',
            component: profilePage,
            children:[
                {
                    path: "user",
                    component: userChild,
                },
                {
                    path: "shipping",
                    component: shippingChild,
                },
                {
                    path: "orders",
                    component: ordersChild,
                },
                {
                    path: "password",
                    component: passwordChild,
                },
                {
                    path: "editPD",
                    component: portraitDescriptionChild,
                },
                {
                    path: "",
                    redirect:'/profile/user',
                },
            ],
        },
        {
            path: '/register',
            component: registerPage,
        },
        {
            path: '/cart',
            component: ShoppingCart,
        },
        {
            path:'/order',
            component: OrderPage,
        },
        {
            path:'/payment',
            component: PaymentPage,
        },
        {
            path: '/confirm',
            component: Confirm,
        },
        {
            path: '/index',
            component: mainPage,
        },
        {
            path: '*',
            redirect: 'index',
        },
    ]
})

router.beforeEach((to, from, next) => {

    if (to.path.includes('profile')|| to.path.includes('shopping')||to.path.includes('cart')){
        if (window.$cookies.get('email') != null) {
            next()
        } else {
            window.alert('Please login to continue')
            next('/login')
        }
    } else if (to.path.includes('admin')) {
        if (window.$cookies.get('isAdmin') !== "0" && window.$cookies.get('isAdmin') !== null) {
            next()
        } else {
            window.alert('You don\'t have the right the access the page')
            next('/index')
        }
    }else if (to.path.includes('forget') || to.path.includes('login')) {
        if (window.$cookies.get('email') === null) {
            next()
        } else {
            window.alert('You already signed in')
            next('/index')
        }
    }else if (to.path.includes('register')){
        if (window.$cookies.get('email') === null){
            next()
        } else {
            next('/index')
        }
    }
    next()
})


export default router;
