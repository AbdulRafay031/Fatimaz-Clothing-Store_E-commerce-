import Layout from "@/component/Layout";
import { motion } from "framer-motion";
import Link from "next/link";
import Navbar from "../../component/navbar";

const stagger = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const fadeInUp = {
  initial: {
    opacity: 0,
    y: 50,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

export default function Seller() {
  return (
    <Layout>
      <div className="min-h-screen bg-black flex flex-col text-white">
        <Navbar />
        {/* Main Content */}
        <main className="flex-1 w-full flex flex-col items-center justify-center py-12 px-4 md:px-8 lg:px-12 bg-black">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <h1 className="text-5xl font-bold mb-6">
              Start selling with Fatimaz
              <br />
              Coming Soon
            </h1>
            <p className="text-xl text-white mb-8">
              This opputunity will be open soon.
              <br />
              This SignIn is only for Admin
            </p>

            <Link href="/admin/SignIn">
              <div className="inline-block bg-orange-500 text-white py-3 px-6 rounded-lg shadow-lg hover:bg-orange-600 transition duration-300 text-lg font-bold">
                SignIn
              </div>
            </Link>

            <p className="text-white mt-4">Free for six months</p>
          </motion.div>

          {/* Information Cards */}
          <motion.div
            className="flex flex-wrap justify-center gap-4 text-black"
            variants={stagger}
            initial="initial"
            animate="animate"
          >
            {[
              {
                title: "What is ecommerce?",
                description:
                  "Electronic commerce (ecommerce) is the trading of goods and services on the internet. Learn about the advantages and disadvantages of this selling channel.",
                linkText: "Intro to ecommerce",
                linkUrl: "/intro-to-ecommerce",
              },
              {
                title: "Build a business",
                description:
                  "For entrepreneurs and growing businesses, ecommerce can be a profitable model to adapt either as the sole focus of your business, or as an additional selling channel.",
                linkText: "Ecommerce business guide",
                linkUrl: "/ecommerce-business-guide",
              },
              {
                title: "Ecommerce fulfillment",
                description:
                  "Ecommerce fulfillment is a vital ingredient to growing a successful online retail channel. Here’s what to consider when looking for an order fulfillment service.",
                linkText: "Learn about fulfillment",
                linkUrl: "/learn-about-fulfillment",
              },
              {
                title: "Premium Listing",
                description:
                  "Upgrade to Premium and get your products listed first, increasing their visibility and chances of better sales. Premium listings ensure your products are seen by more potential customers.",
                linkText: "Try Premium",
                linkUrl: "/try-premium",
              },
            ].map((card, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-lg shadow-lg p-6 w-full sm:w-64"
                variants={fadeInUp}
              >
                <h3 className="text-xl font-semibold mb-4">{card.title}</h3>
                <p className="text-gray-700 mb-4">{card.description}</p>
                <Link href={card.linkUrl}>
                  <div className="text-blue-600 font-semibold hover:underline">
                    {card.linkText} &rarr;
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </main>
      </div>
    </Layout>
  );
}
