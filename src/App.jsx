import SubscriptionFlow from "./components/suscriptionFlow.jsx";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Sidebar from "./components/sidebar.jsx";
import Facturacion from "./components/facturacion.jsx";
import InventoryComponent from "./components/inventory.jsx";
import { ProductProvider } from "./context/productsContext.jsx";
import { ClientProvider } from "./context/clientProvider.jsx";
import { InvoiceHistoryProvider } from "./context/InvoicesProvider.jsx";
import { FollowInvoicesProvider } from "./context/invoicesFollowProvider.jsx";
import { FollowIdInvoicesProvider } from "./context/invoiceIdFollowProvider.jsx";
import { StepProvider } from "./context/stepProvider.jsx";
import SalesStatics from "./components/statics.jsx";
import { Toaster } from "sonner";
import Settings from "./components/settings.jsx";
import { NotificationProvider } from "./context/notification.jsx";
import { NotificationsProvider } from "./context/notificationsProvider.jsx";
import { NotificationList } from "./components/notifications.jsx";
import HeroSection from "./components/home/heroSection.jsx";
import FeaturesSection from "./components/home/features.jsx";
import PricingSection from "./components/home/pricing.jsx";
import TestimonialSection from "./components/home/testimonial.jsx";
import CallToAction from "./components/home/callToAction.jsx";
import Footer from "./components/home/footer.jsx";
import { PlanProvider } from "./context/planProvider.jsx";
import Login from "./components/login.jsx";



function App() {
  return (
    <PlanProvider>
        <NotificationsProvider>
          <NotificationProvider>
            <StepProvider>
              <FollowIdInvoicesProvider>
                <FollowInvoicesProvider>
                  <InvoiceHistoryProvider>
                    <ClientProvider>
                      < ProductProvider>
                      <Toaster richColors position="top-center" />
                        <Router>
                          <Routes>
                            <Route
                              path="/"
                              element={
                                <>
                                  <HeroSection />
                                  <FeaturesSection />
                                  <PricingSection />
                                  <TestimonialSection />
                                  <CallToAction />
                                  <Footer />
                                </>
                              }
                            />
                            <Route path="/login" element={<Login />} />
                            <Route path="/start" element={<SubscriptionFlow />} />
                            <Route
                              path="/panel"
                              element={
                                <>
                                  <Sidebar/>
                                  <NotificationList />
                                  <Facturacion />
                                </>
                              }
                            />
                            <Route
                              path="/inventory"
                              element={
                                <>
                                  <Sidebar />
                                  <NotificationList />
                                  <InventoryComponent />
                                </>
                              }
                            />
                            <Route
                              path="/statics"
                              element={
                                <>
                                  <Sidebar />
                                  <NotificationList />
                                  <SalesStatics />
                                </>
                              }
                            />
                            <Route
                              path="/settings"
                              element={
                                <>
                                  <Sidebar />
                                  <NotificationList />
                                  <Settings />
                                </>
                              }
                            />
                          </Routes>
                        </Router>
                      </ProductProvider>
                    </ClientProvider>
                  </InvoiceHistoryProvider>
                </FollowInvoicesProvider>
              </FollowIdInvoicesProvider>
            </StepProvider>
          </NotificationProvider> 
        </NotificationsProvider>
    </PlanProvider>
  );
}



export default App
