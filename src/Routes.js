import React, { Component } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import LoginLayout from "layouts/login/LoginLayout";
import DashboardLayout from "layouts/dashboard/DashboardLayout";
import LoginPage from "views/auth/LoginPage";
import ForgotPasswordPage from "views/auth/ForgotPasswordPage";
import ResetPasswordPage from "views/auth/ResetPasswordPage";
import LogoutRoute from "views/auth/LogoutRoute";
import DashboardPage from "views/dashboard/DashboardPage";
import HomePage from "views/home/HomePage";
import CurrentAutoshipsPage from "views/myAccount/CurrentAutoshipsPage";
import CreateAutoshipPage from "views/myAccount/CreateAutoshipPage";
import PastAutoshipsPage from "views/myAccount/PastAutoshipsPage";
import TransferCommissionsPage from "views/myAccount/TransferCommissionsPage";
import IssueCreditPage from "views/myAccount/IssueCreditPage";
import CreditLogPage from "views/myAccount/CreditLogPage";
import CreateUserPage from "views/myAccount/CreateUserPage";
import OrderHistoryPage from "views/myAccount/OrderHistoryPage";
import OrderReceiptPage from "views/myAccount/OrderReceiptPage";
import PaymentOptionsPage from "views/myAccount/PaymentOptionsPage";
import SettingsPage from "views/myAccount/SettingsPage";
import BinaryTreePage from "views/myTeam/BinaryTreePage";
import EnrollerTreePage from "views/myTeam/EnrollerTreePage";
import ListViewPage from "views/myTeam/ListViewPage";
import UplinesPage from "views/myTeam/UplinesPage";
import ContactManagerPage from "views/contactManager/ContactManagerPage";
import LeaderboardPage from "views/analytics/LeaderboardPage";
import EarningsPage from "views/analytics/EarningsPage";
import RankPage from "views/analytics/RankPage";
import LifestyleBonusTrackerPage from "views/lifestyleBonusTracker/LifestyleBonusTrackerPage";
import BepicWebsitesPage from "views/myWebsite/BepicWebsitesPage";
import BepicCapturePage from "views/myWebsite/BepicCapturePage";
import TrainingPage from "views/training/TrainingPage";
import ResourcesPage from "views/tools/ResourcesPage";
import EventsPage from "views/tools/EventsPage";
import NewsPage from "views/news/NewsPage";
import ShopPage from "views/shop/ShopPage";
import SampleShopPage from "views/shop/SampleShopPage";
import CreditShopPage from "views/shop/CreditShopPage";
import ProductDetailPage from "views/shop/ProductDetailPage";
import CheckoutPage from "views/shop/CheckoutPage";
import SupportHelpPage from "views/support/support/SupportHelpPage";
import SupportPage from "views/support/tickets/SupportPage";
import TicketPage from "views/support/tickets/ticket/TicketPage";
import SocialWallPage from "views/social/SocialWallPage";
import TaxFormPage from "views/verification/taxForm/TaxFormPage";
import AccountVerificationPage from "views/verification/accountVerification/AccountVerificationPage";
import CommingSoon from "views/commingSoon/CommingSoonPage";
import HoldingTankPage from 'views/myTeam/HoldingTankPage'
import UnilevelPage from 'views/myTeam/UnilevelPage'
import PlacementPage from 'views/myTeam/PlacementPage'
import CurrentSubscriptionsPage from 'views/myAccount/CurrentSubscriptionsPage'
import CreateSubscriptionPage from "views/myAccount/CreateSubscriptionPage";
import PastSubscriptionsPage from 'views/myAccount/PastSubscriptionsPage'

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <UnauthedRoute path="/login" component={LoginPage} />
        <UnauthedRoute path="/forgot-password" component={ForgotPasswordPage} />
        <UnauthedRoute
          path="/auth/check_secret_key"
          component={ResetPasswordPage}
        />
        <Route path="/logout" component={LogoutRoute} />
        <AuthedRoute
          path="/home"
          component={HomePage}
          perms={["affiliate", "preferred", "need_verification", "need_tax"]}
        />
        <AuthedRoute
          path="/dashboard"
          component={DashboardPage}
          perms={["affiliate"]}
        />
        <AuthedRoute
          path="/autoship/current-autoships"
          component={CurrentAutoshipsPage}
          perms={["affiliate", "preferred"]}
        />
        <AuthedRoute
          path="/autoship/create-autoship"
          component={CreateAutoshipPage}
          perms={["affiliate", "preferred"]}
        />
        <AuthedRoute
          path="/autoship/past-autoships"
          component={PastAutoshipsPage}
          perms={["affiliate", "preferred"]}
        />
        <AuthedRoute
          path="/subscription/current-subscriptions"
          component={CurrentSubscriptionsPage}
          perms={["affiliate", "preferred"]}
        />
        <AuthedRoute
          path="/subscription/create-subscription"
          component={CreateSubscriptionPage}
          perms={["affiliate", "preferred"]}
        />
        <AuthedRoute
          path="/subscription/past-subscriptions"
          component={PastSubscriptionsPage}
          perms={["affiliate", "preferred"]}
        />
        <AuthedRoute
          path="/credit-wallet/transfer-commissions"
          component={TransferCommissionsPage}
          perms={["affiliate"]}
        />
        <AuthedRoute
          path="/credit-wallet/issue-credit"
          component={IssueCreditPage}
          perms={["affiliate"]}
        />
        <AuthedRoute
          path="/credit-wallet/create-user"
          component={CreateUserPage}
          perms={["affiliate"]}
        />
        <AuthedRoute
          path="/credit-wallet/credit-log"
          component={CreditLogPage}
          perms={["affiliate"]}
        />
        <AuthedRoute
          path="/order-history"
          component={OrderHistoryPage}
          perms={["affiliate", "preferred"]}
        />
        <Route
          path="/order-receipt/:orderId"
          component={OrderReceiptPage}
          perms={["affiliate", "preferred"]}
        />
        <AuthedRoute
          path="/payment-options"
          component={PaymentOptionsPage}
          perms={["affiliate"]}
        />
        <AuthedRoute
          path="/settings"
          component={SettingsPage}
          perms={["affiliate", "preferred"]}
        />
        <AuthedRoute
          path="/my-team/binary-tree"
          component={BinaryTreePage}
          fullLayout
          perms={["affiliate"]}
        />
        {/* <AuthedRoute
          path="/my-team/enroller-tree"
          component={EnrollerTreePage}
          perms={["affiliate"]}
        /> */}
        <AuthedRoute path='/my-team/enroller-tree' perms={["affiliate"]} component={UnilevelPage} />
        <AuthedRoute path='/my-team/placement-tree' perms={["affiliate"]} component={PlacementPage} />
        <AuthedRoute path='/my-team/holding-tank' perms={["affiliate"]} component={HoldingTankPage} />
        <AuthedRoute
          path="/my-team/list-view"
          component={ListViewPage}
          perms={["affiliate"]}
        />
        <AuthedRoute
          path="/my-team/uplines"
          component={UplinesPage}
          perms={["affiliate"]}
        />
        <AuthedRoute
          path="/my-website/replicated-sites"
          component={BepicWebsitesPage}
          perms={["affiliate"]}
        />
        <AuthedRoute
          path="/my-website/bepic-capture"
          component={BepicCapturePage}
          perms={["affiliate"]}
        />
        <AuthedRoute
          path="/contact-manager"
          component={ContactManagerPage}
          perms={["affiliate"]}
        />
        <AuthedRoute
          path="/xceler8-skin"
          component={CommingSoon}
          perms={["affiliate"]}
        />

        <AuthedRoute
          path="/bos-club"
          component={CommingSoon}
          perms={["affiliate"]}
        />
        <AuthedRoute
          path="/online-marketing-ai"
          component={CommingSoon}
          perms={["affiliate"]}
        />
        <AuthedRoute
          path="/pes"
          component={CommingSoon}
          perms={["affiliate"]}
        />
        <AuthedRoute
          path="/rosetta-stone"
          component={CommingSoon}
          perms={["affiliate"]}
        />
        <AuthedRoute
          path="/smart-market-academy"
          component={CommingSoon}
          perms={["affiliate"]}
        />
        <AuthedRoute
          path="/leaderboard"
          component={LeaderboardPage}
          perms={["affiliate"]}
        />
        <AuthedRoute
          path="/aluva-bonus"
          component={LifestyleBonusTrackerPage}
          perms={["affiliate"]}
        />
        <AuthedRoute
          path="/earnings"
          component={EarningsPage}
          perms={["affiliate"]}
        />
        <AuthedRoute path="/rank" component={RankPage} perms={["affiliate"]} />
        <AuthedRoute
          path="/training"
          component={TrainingPage}
          perms={["affiliate", "preferred"]}
        />
        <AuthedRoute
          path="/resources"
          component={ResourcesPage}
          perms={["affiliate", "preferred"]}
        />
        <AuthedRoute
          path="/news"
          component={NewsPage}
          perms={["affiliate", "preferred"]}
        />
        <AuthedRoute
          path="/events"
          component={EventsPage}
          perms={["affiliate", "preferred"]}
        />
        <AuthedRoute
          path="/shop/products"
          component={ShopPage}
          perms={["affiliate", "preferred"]}
        />
        <AuthedRoute
          path="/shop/sample_products"
          component={SampleShopPage}
          perms={["affiliate", "preferred"]}
        />
        <AuthedRoute
          path="/shop/product_credits"
          component={CreditShopPage}
          perms={["affiliate", "preferred"]}
        />
        <AuthedRoute
          path="/shop/product/:productId"
          component={ProductDetailPage}
          perms={["affiliate", "preferred"]}
        />
        <AuthedRoute
          path="/shop/checkout"
          component={CheckoutPage}
          perms={["affiliate", "preferred"]}
        />
        <AuthedRoute
          path="/support/help"
          component={SupportHelpPage}
          exact={true}
          perms={["affiliate", "preferred"]}
        />
        <AuthedRoute
          path="/support/tickets"
          component={SupportPage}
          exact={true}
          perms={["affiliate", "preferred"]}
        />
        <AuthedRoute
          path="/support/ticket/:ticketId"
          component={TicketPage}
          perms={["affiliate", "preferred"]}
        />
        <AuthedRoute path="/social/wall" component={SocialWallPage} />
        <AuthedRoute
          path="/tax-form"
          component={TaxFormPage}
          perms={["need_tax"]}
        />
        <AuthedRoute
          path="/verification"
          component={AccountVerificationPage}
          perms={["need_verification"]}
        />        
        <Redirect to="/home" />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;

const UnauthedRoute = ({ component: Component, ...props }) => (
  <Route
    {...props}
    render={(props) => (
      <LoginLayout>
        <Component {...props} />
      </LoginLayout>
    )}
  />
);

const AuthedRoute = ({ component: Component, fullLayout, perms, ...props }) => {
  return (
    <Route
      {...props}
      render={(props) => (
        <DashboardLayout fullLayout={fullLayout} perms={perms}>
          <Component {...props} />
        </DashboardLayout>
      )}
    />
  );
};
