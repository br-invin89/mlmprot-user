import { ReactComponent as DialpadIcon } from "assets/icons/dialpad.svg";
import { ReactComponent as UserIcon } from "assets/icons/user.svg";
import { ReactComponent as UsersIcon } from "assets/icons/users.svg";
import { ReactComponent as GlobalIcon } from "assets/icons/global.svg";
import { ReactComponent as GraduactionIcon } from "assets/icons/graduation.svg";
import { ReactComponent as EarphoneIcon } from "assets/icons/earphones.svg";
import { ReactComponent as ChartIcon } from "assets/icons/chart.svg";
import { ReactComponent as WrenchIcon } from "assets/icons/wrench.svg";
import { ReactComponent as BookIcon } from "assets/icons/book-open.svg";
import { ReactComponent as BagIcon } from "assets/icons/handbag.svg";
import { ReactComponent as QuestionIcon } from "assets/icons/question.svg";
import { ReactComponent as DollarIcon } from "assets/icons/dollar.svg";
import { ReactComponent as StarIcon } from "assets/icons/star_filled.svg";
import { ReactComponent as NewsIcon } from "assets/icons/news.svg";
import { ReactComponent as EventIcon } from "assets/icons/events.svg";
import { ReactComponent as HomeIcon } from "assets/icons/home.svg";
import { ReactComponent as GiftIcon } from "assets/icons/gift.svg";
import { ReactComponent as ContactIcon } from "assets/icons/contact.svg";
import { ReactComponent as RankIcon } from "assets/icons/menu-rank.svg";
import { ReactComponent as LeaderboardIcon } from "assets/icons/leaderboard.svg";
import { ReactComponent as Logout } from "assets/icons/logout.svg";
import { ReactComponent as LifestylBonusTrackerIcon } from "assets/icons/lifestyle-bonus-tracker.svg";

export const menus = [
  {
    title: "Dashboard",
    path: "/dashboard",
    icon: <DialpadIcon />,
  },
  {
    title: "My Account",
    icon: <UserIcon />,
    submenus: [
      {
        title: "Autoship",
        path: "/autoship/current-autoships",
      },
      {
        title: "Subscription",
        path: "/subscription/current-subscriptions",
      },
      {
        title: "Credit Wallet",
        path: "/credit-wallet/transfer-commissions",
      },
      {
        title: "Order History",
        path: "/order-history",
      },
      {
        title: "Payment Options",
        path: "/payment-options",
      },
      {
        title: "Settings",
        path: "/settings",
      },
    ],
  },
  // {
  //   title: "My Products",
  //   icon: <GiftIcon />,
  //   submenus: [
  //     {
  //       title: "BOS Club",
  //       path: "/bos-club",
  //     },
  //     {
  //       title: "Online Marketing AI",
  //       path: "/online-marketing-ai",
  //     },
  //     {
  //       title: "PES",
  //       path: "/pes",
  //     },
  //     {
  //       title: "Rosetta Stone",
  //       path: "/rosetta-stone",
  //     },
  //     {
  //       title: "Smart Market Academy",
  //       path: "/smart-market-academy",
  //     },
  //     {
  //       title: "Xceler8 Skin",
  //       path: "/xceler8-skin",
  //     },
  //   ],
  // },
  {
    title: "My Team",
    icon: <UsersIcon />,
    submenus: [
      {
        title: "Enroller Tree",
        path: "/my-team/enroller-tree",
      },
      {
        title: "Placement Tree",
        path: "/my-team/placement-tree",
      },
      {
        title: "Holding Tank",
        path: "/my-team/holding-tank",
      },
      // {
      //   title: "Binary Tree",
      //   path: "/my-team/binary-tree",
      // },
      {
        title: "Uplines",
        path: "/my-team/uplines",
      },
    ],
  },
  {
    title: "My Website",
    icon: <GlobalIcon />,
    submenus: [
      {
        title: "Replicated Sites",
        path: "/my-website/replicated-sites",
      },
      // {
      //   title: "Digital Profit Replicated Sites",
      //   path: "/my-website/digital-sites",
      // },
      // {
      //   title: "Capture Pages",
      //   path: "/my-website/bepic-capture",
      // },
      // {
      //   title: "Digital Profit Capture Pages",
      //   path: "/my-website/digital-capture",
      // },
    ],
  },
  {
    title: "Contact Manager",
    path: "/contact-manager",
    icon: <ContactIcon />,
  },
  {
    title: "Leaderboard",
    path: "/leaderboard",
    icon: <LeaderboardIcon />,
  },
  {
    title: "Aluva Bonus",
    path: "/aluva-bonus",
    icon: <LifestylBonusTrackerIcon />,
  },
  {
    title: "Earnings",
    path: "/earnings",
    icon: <DollarIcon />,
  },
  {
    title: "Rank",
    path: "/rank",
    icon: <RankIcon />,
  },
  // {
  //   title: "Training",
  //   path: "/training",
  //   icon: <GraduactionIcon />,
  // },
  {
    title: "Training",
    path: "/resources",
    icon: <BookIcon />,
  },
  {
    title: "News",
    path: "/news",
    icon: <NewsIcon />,
  },
  // {
  //   title: "Events",
  //   path: "/events",
  //   icon: <EventIcon />,
  // },
  // {
  //   title: "Digital Profit Access",
  //   path: "/digital-profit-access",
  //   icon: <BagIcon />,
  // },
  {
    title: "Shop",
    icon: <BagIcon />,
    submenus: [
      {
        title: 'Products',
        path: '/shop/products'
      },
      {
        title: 'Sample Products',
        path: '/shop/sample_products'
      },
      {
        title: 'Product Credits',
        path: '/shop/product_credits'
      },
    ]
  },
  // {
  //   title: "Shop Digital Profit",
  //   icon: <BagIcon />,
  //   submenus: [
  //     {
  //       title: "Wanderlust",
  //       path: "/shop/digital/wanderlust",
  //     },
  //     {
  //       title: "Wallet",
  //       path: "/shop/digital/wallet",
  //     },
  //     {
  //       title: "Echo Edu",
  //       path: "/shop/digital/echo-edu",
  //     },
  //     {
  //       title: "Echo Trading",
  //       path: "/shop/digital/echo-trading",
  //     },
  //   ]
  // },
  {
    title: "Support",
    path: "/support/help",
    icon: <QuestionIcon />,
  },
];

export const menusOnCustomer = [
  {
    title: "My Account",
    icon: <UserIcon />,
    submenus: [
      {
        title: "Autoship",
        path: "/autoship/current-autoships",
      },
      {
        title: "Subscription",
        path: "/subscription/current-subscriptions",
      },      
      {
        title: "Order History",
        path: "/order-history",
      },
      {
        title: "Settings",
        path: "/settings",
      },
    ],
  },
  // {
  //   title: "My Products",
  //   icon: <UserIcon />,
  //   submenus: [
  //     {
  //       title: "BOS Club",
  //       path: "/bos-club",
  //     },
  //     {
  //       title: "Online Marketing AI",
  //       path: "/online-marketing-ai",
  //     },
  //     {
  //       title: "PES",
  //       path: "/pes",
  //     },
  //     {
  //       title: "Rosetta Stone",
  //       path: "/rosetta-stone",
  //     },
  //     {
  //       title: "Smart Market Academy",
  //       path: "/smart-market-academy",
  //     },
  //     {
  //       title: "Xceler8 Skin",
  //       path: "/xceler8-skin",
  //     },
  //   ],
  // },
  // {
  //   title: "Training",
  //   path: "/training",
  //   icon: <GraduactionIcon />,
  // },
  {
    title: "Trainings",
    path: "/resources",
    icon: <BookIcon />,
  },
  {
    title: "News",
    path: "/news",
    icon: <BookIcon />,
  },
  // {
  //   title: "Events",
  //   path: "/events",
  //   icon: <BookIcon />,
  // },
  // {
  //   title: "Digital Profit Access",
  //   path: "/digital-profit-access",
  //   icon: <BagIcon />,
  // },
  {
    title: "Shop",
    icon: <BagIcon />,
    submenus: [
      {
        title: 'Products',
        path: '/shop/products'
      },
      {
        title: 'Sample Products',
        path: '/shop/sample_products'
      },
      {
        title: 'Product Credits',
        path: '/shop/product_credits'
      },
    ]
  },
  // {
  //   title: "Shop Digital Profit",
  //   icon: <BagIcon />,
  //   submenus: [
  //     {
  //       title: "Wanderlust",
  //       path: "/shop/digital/wanderlust",
  //     },
  //     {
  //       title: "Wallet",
  //       path: "/shop/digital/wallet",
  //     },
  //     {
  //       title: "Echo Edu",
  //       path: "/shop/digital/echo-edu",
  //     },
  //     {
  //       title: "Echo Trading",
  //       path: "/shop/digital/echo-trading",
  //     },
  //   ]
  // },
  {
    title: "Support",
    path: "/support/help",
    icon: <QuestionIcon />,
  },
];

export const menusOnFraud = [
  {
    title: "Verification",
    basepath: "/verification",
    path: "/verification",
  },
];

export const menusOnTax = [
  {
    title: "Upload Tax Form",
    basepath: "/tax-form",
    path: "/tax-form",
  },
];

export const mobileMenus = [
  {
    title: "Dashboard",
    path: "dashboard",
    icon: <DialpadIcon />,
  },
  {
    title: "My Account",
    icon: <UserIcon />,
    submenus: [
      {
        title: "Order History",
        path: "/order-history",
      },
      {
        title: "Payment Options",
        path: "/payment-options",
      },
      {
        title: "Settings",
        path: "/settings",
      },
      {
        title: "Current Autoships",
        path: "/autoship/current-autoships",
      },
      {
        title: "Past Autoships",
        path: "/autoship/past-autoships",
      },
      {
        title: "Current Subscriptions",
        path: "/subscription/current-subscriptions",
      },
      {
        title: "Past Subscriptions",
        path: "/subscription/past-subscriptions",
      },
      // {
      //   title: "Digital Profit Subscriptions",
      //   path: "/autoship/digital-profit-subscriptions",
      // },
      {
        title: "Credit Wallet",
        path: "/credit-wallet/transfer-commissions",
      },
      {
        title: "Issue Credit",
        path: "/credit-wallet/issue-credit",
      },
      {
        title: "Create Team Member",
        path: "/credit-wallet/create-user",
      },
      {
        title: "Credit Log",
        path: "/credit-wallet/credit-log",
      },
    ],
  },
  // {
  //   title: "My Products",
  //   icon: <UserIcon />,
  //   submenus: [
  //     {
  //       title: "BOS Club",
  //       path: "/bos-club",
  //     },
  //     {
  //       title: "Online Marketing AI",
  //       path: "/online-marketing-ai",
  //     },
  //     {
  //       title: "PES",
  //       path: "/pes",
  //     },
  //     {
  //       title: "Rosetta Stone",
  //       path: "/rosetta-stone",
  //     },
  //     {
  //       title: "Smart Market Academy",
  //       path: "/smart-market-academy",
  //     },
  //     {
  //       title: "Xceler8 Skin",
  //       path: "/xceler8-skin",
  //     },
  //   ],
  // },

  {
    title: "My Team",
    icon: <UsersIcon />,
    submenus: [
      {
        title: "Enroller Tree",
        path: "/my-team/enroller-tree",
      },
      {
        title: "Placement Tree",
        path: "/my-team/placement-tree",
      },
      {
        title: "Holding Tank",
        path: "/my-team/holding-tank",
      },
      // {
      //   title: "Binary Tree",
      //   path: "/my-team/binary-tree",
      // },
      {
        title: "Uplines",
        path: "/my-team/uplines",
      },
    ],
  },
  {
    title: "My Website",
    icon: <GlobalIcon />,
    submenus: [
      {
        title: "Replicated Sites",
        path: "/my-website/replicated-sites",
      },
      // {
      //   title: "Digital Profit Replicated Sites",
      //   path: "/my-website/digital-sites",
      // },
      // {
      //   title: "Capture Pages",
      //   path: "/my-website/bepic-capture",
      // },
      // {
      //   title: "Digital Profit Capture Pages",
      //   path: "/my-website/digital-capture",
      // },
    ],
  },
  {
    title: "Contact Manager",
    path: "/contact-manager",
    icon: <ContactIcon />,
  },
  {
    title: "Leaderboard",
    path: "/leaderboard",
    icon: <LeaderboardIcon />,
  },
  {
    title: "Aluva Bonus",
    path: "/aluva-bonus",
    icon: <LifestylBonusTrackerIcon />,
  },
  {
    title: "Earnings",
    path: "/earnings",
    icon: <DollarIcon />,
  },
  {
    title: "Rank",
    path: "/rank",
    icon: <RankIcon />,
  },
  // {
  //   title: "Training",
  //   path: "/training",
  // },
  // {
  //   title: "Resources",
  //   path: "/resources",
  // },
  {
    title: "News",
    path: "/news",
    icon: <NewsIcon />,
  },
  // {
  //   title: "Events",
  //   path: "/events",
  // },
  // {
  //   title: "Digital Profit Access",
  //   path: "/digital-profit-access",
  // },
  {
    title: "Shop",
    icon: <BagIcon />,
    submenus: [
      {
        title: 'Products',
        path: '/shop/products'
      },
      {
        title: 'Sample Products',
        path: '/shop/sample_products'
      },
      {
        title: 'Product Credits',
        path: '/shop/product_credits'
      },
    ]
  },
  // {
  //   title: "Shop Digital Profit",
  //   submenus: [
  //     {
  //       title: "Wanderlust",
  //       path: "/shop/digital/wanderlust",
  //     },
  //     {
  //       title: "Wallet",
  //       path: "/shop/digital/wallet",
  //     },
  //     {
  //       title: "Echo Edu",
  //       path: "/shop/digital/echo-edu",
  //     },
  //     {
  //       title: "Echo Trading",
  //       path: "/shop/digital/echo-trading",
  //     },
  //   ]
  // },
  {
    title: "Support",
    path: "/support/help",
    icon: <QuestionIcon />,
  },
  {
    title: "Logout",
    path: "/logout",
    icon: <Logout />,
  },
];

export const mobileMenusOnCustomer = [
  {
    title: "My Account",
    submenus: [
      {
        title: "Current Autoships",
        path: "/autoship/current-autoships",
      },
      {
        title: "Past Autoships",
        path: "/autoship/past-autoships",
      },
      {
        title: "Current Subscriptions",
        path: "/subscription/current-subscriptions",
      },
      {
        title: "Past Subscriptions",
        path: "/subscription/past-subscriptions",
      },
      {
        title: "Order History",
        path: "/order-history",
      },
      {
        title: "Settings",
        path: "/settings",
      },
    ],
  },
  // {
  //   title: "Training",
  //   path: "/training",
  // },
  // {
  //   title: "Resources",
  //   path: "/tools/resources",
  // },
  {
    title: "News",
    path: "/news",
  },
  // {
  //   title: "Events",
  //   path: "/tools/events",
  // },
  // {
  //   title: "Digital Profit Access",
  //   path: "/digital-profit-access",
  // },
  {
    title: "Shop",
    icon: <BagIcon />,
    submenus: [
      {
        title: 'Products',
        path: '/shop/products'
      },
      {
        title: 'Sample Products',
        path: '/shop/sample_products'
      },
      {
        title: 'Product Credits',
        path: '/shop/product_credits'
      },
    ]
  },
  // {
  //   title: "Shop Digital Profit",
  //   submenus: [
  //     {
  //       title: "Wanderlust",
  //       path: "/shop/digital/wanderlust",
  //     },
  //     {
  //       title: "Wallet",
  //       path: "/shop/digital/wallet",
  //     },
  //     {
  //       title: "Echo Edu",
  //       path: "/shop/digital/echo-edu",
  //     },
  //     {
  //       title: "Echo Trading",
  //       path: "/shop/digital/echo-trading",
  //     },
  //   ]
  // },
  {
    title: "Support",
    path: "/support/help",
    icon: <QuestionIcon />,
  },
  {
    title: "Logout",
    path: "/logout",
  },
];

export const mobileMenusOnFraud = [
  {
    title: "Verification",
    path: "/verification",
  },
  {
    title: "Logout",
    path: "/logout",
  },
];

export const mobileMenusOnTax = [
  {
    title: "Upload Tax Form",
    path: "/tax-form",
  },
  {
    title: "Logout",
    path: "/logout",
  },
];

const submenuGroups = {
  autoship: [
    {
      title: "Current Autoships",
      path: "/autoship/current-autoships",
    },
    {
      title: "Past Autoships",
      path: "/autoship/past-autoships",
    },
    // {
    //   title: "Digital Profit Subscriptions",
    //   path: "/autoship/digital-profit-subscriptions"
    // }
  ],
  subscription: [
    {
      title: "Current Subscriptions",
      path: "/subscription/current-subscriptions",
    },
    {
      title: "Past Subscriptions",
      path: "/subscription/past-subscriptions",
    },
  ],
  "my-team": [
    {
      title: "Enroller Tree",
      path: "/my-team/enroller-tree",
    },
    {
      title: "Placement Tree",
      path: "/my-team/placement-tree",
    },
    {
      title: "Holding Tank",
      path: "/my-team/holding-tank",
    },
    // {
    //   title: "Binary Tree",
    //   path: "/my-team/binary-tree",
    // },
    {
      title: "Uplines",
      path: "/my-team/uplines",
    },
  ],
  "credit-wallet": [
    {
      title: "Transfer Commissions",
      path: "/credit-wallet/transfer-commissions",
    },
    {
      title: "Issue Credit",
      path: "/credit-wallet/issue-credit",
    },
    {
      title: "Create Team Member",
      path: "/credit-wallet/create-user",
    },
    {
      title: "Credit Log",
      path: "/credit-wallet/credit-log",
    },
  ],
  "my-website": [
    {
      title: "Replicated Sites",
      path: "/my-website/replicated-sites",
    },
    // {
    //   title: "Digital Profit Replicated Sites",
    //   path: "/my-website/digital-sites",
    // },
    // {
    //   title: "Capture Pages",
    //   path: "/my-website/bepic-capture",
    // },
    // {
    //   title: "Digital Profit Capture Pages",
    //   path: "/my-website/digital-capture",
    // },
  ],
  "shop":[
    {
      title: 'Products',
      path: '/shop/products'
    },
    {
      title: 'Sample Products',
      path: '/shop/sample_products'
    },
    {
      title: 'Product Credits',
      path: '/shop/product_credits'
    },
  ]
};

export const getSubmenuGroups = (basepath) => {
  let submenus = [];
  Object.keys(submenuGroups)
    .filter((key) => key == basepath)
    .map((key) => {
      submenus = submenuGroups[key];
    });
  return submenus;
};
