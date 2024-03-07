export const subs = [
    {
        title: 'Free',
        price: 0,
        advantages: [
            'Access to aplication before of supporters'
        ],
        level: 0,
        buttonLabel: 'Start for Free',
        redirectUrl:'/checkout-subscription?sub=0'
    },
    {
        title: 'Supporter Basic',
        price: 4,
        advantages: [
            'Access to aplication 12 day before of realease',
            'Special channel in our discord',
        ],
        level: 1,
        buttonLabel: 'Get Sub',
        redirectUrl:'/checkout-subscription?sub=1',
        idPaypal: 'P-1T101486LF5207433MXS5JAI'
    },
    {
        title: 'Supporter VIP',
        price: 8,
        advantages: [
            'Access to aplication in the day of realease',
            'Special channel in our discord',
        ],
        level: 2,
        buttonLabel: 'Get Sub',
        redirectUrl: '/checkout-subscription?sub=2'
    },
    {
        title: 'Custom Patches',
        price: 'Custom',
        advantages: [
            'Contact us to receive custom price',
            'Custom aplication',
            'Direct contact with me for updates'
        ],
        level: 3,
        buttonLabel: 'Contact Us',
        redirectUrl:'/contact-us'
    }
]