import axios from "axios"
import { showAlert } from "./alert"

const stripe = Stripe('pk_test_51JHWRcSFuhuTkkVV4w5zV4Zss37e71pzazrB4VlRZzF4wDsx2QUt7DrDscFBHzpq8jWc6uUv8KhDsvWzhN3qO6WW00XgCnDXoF')

export const bookTour = async tourId => {
    try {
        // 1) Get checkout session from API
        const session = await axios(`/api/v1/bookings/checkout-session/${tourId}`)
        // 2) Create checkout form + charge credit card
        // await stripe.redirectToCheckout({
        //     sessionId: session.data.session.id
        // })
        window.location.href = session.data.session.url
    } catch (err) {
        showAlert('error', err)
    }
}