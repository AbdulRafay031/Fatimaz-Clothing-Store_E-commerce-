import Image from "next/image";
import { Users, MessageSquareText, Star, User } from "lucide-react";
import Link from "next/link";
import { useSession, signIn } from "next-auth/react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import Navbar from "../../component/navbar";
import Footer from "../../component/footer"

export default function CommunityPage() {
  const { data: session } = useSession();
  const [members, setMembers] = useState([]);
  const [joined, setJoined] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

useEffect(() => {
  setIsMounted(true);

  const fetchMembers = async () => {
    try {
      const res = await axios.get("/api/community/join");
      setMembers(res.data);
    } catch (err) {
      console.error("Failed to load members:", err);
    }
  };

  fetchMembers();
}, []);

const handleJoin = async () => {
  if (!session?.user?.email) {
    signIn();
    return;
  }

  if (members.find((m) => m.email === session.user.email)) {
    toast.info("You already joined.");
    return;
  }

  try {
    await axios.post("/api/community/join", { email: session.user.email });

    const refreshed = await axios.get("/api/community/join");
    setMembers(refreshed.data);

    toast.success("Joined Fatimaz Community successfully!");
  } catch (error) {
    console.error("Join failed:", error);
    toast.error("Something went wrong!");
  }
};


  return (
    <div className="bg-white text-black min-h-screen">
      <Navbar />
      <div className="text-center max-w-3xl mx-auto mb-10">
        <h1 className="text-4xl sm:text-5xl font-bold text-black mb-4">
          Welcome to the Fatimaz Community
        </h1>
        <p className="text-gray-700 text-lg">
          A vibrant space for fashion lovers to connect, share ideas, and stay
          updated with the latest trends from Fatimaz.
        </p>
      </div>

      {/* Grid Cards */}
      <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto mb-16">
        <div className="bg-gray-100 p-6 rounded-xl shadow">
          <Users className="text-green-700 w-8 h-8 mb-2" />
          <h3 className="text-xl font-semibold mb-2">
            Connect with Fashion Lovers
          </h3>
          <p className="text-gray-600 text-sm">
            Share your outfits, style tips, or just chat with others who love
            fashion like you do.
          </p>
        </div>

        <div className="bg-gray-100 p-6 rounded-xl shadow">
          <MessageSquareText className="text-green-700 w-8 h-8 mb-2" />
          <h3 className="text-xl font-semibold mb-2">Exclusive Updates</h3>
          <p className="text-gray-600 text-sm">
            Be the first to know about new launches, sales, and
            behind-the-scenes content.
          </p>
        </div>

        <div className="bg-gray-100 p-6 rounded-xl shadow">
          <Star className="text-green-700 w-8 h-8 mb-2" />
          <h3 className="text-xl font-semibold mb-2">Rewards & Giveaways</h3>
          <p className="text-gray-600 text-sm">
            Members get access to community-only giveaways, sneak peeks, and
            discounts.
          </p>
        </div>
      </div>

      {/* Testimonials */}
      <div className="bg-green-50 py-12">
        <h2 className="text-3xl font-bold text-center text-black mb-6">
          What Our Members Say
        </h2>
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6 px-4">
          <div className="bg-white p-6 rounded-lg shadow">
            <p className="text-gray-700 italic">
              “I love the vibes in this community! Everyone’s so stylish and
              helpful.”
            </p>
            <p className="mt-4 text-sm font-semibold text-green-700">
              — Ayesha R.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <p className="text-gray-700 italic">
              “The product updates and fashion tips keep me ahead of trends!”
            </p>
            <p className="mt-4 text-sm font-semibold text-green-700">
              — Sana Malik
            </p>
          </div>
        </div>
      </div>

      {/* Join CTA */}
      <div className="bg-white text-black min-h-screen px-4 py-10">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <h1 className="text-4xl font-bold text-black mb-4">
            Join the Fatimaz Community
          </h1>
          <p className="text-gray-700 text-lg mb-6">
            Connect with other fashion lovers and stay updated with exclusive
            news!
          </p>
          <button
            onClick={handleJoin}
            className="bg-green-700 hover:bg-green-800 text-white font-semibold py-3 px-6 rounded-full shadow-md transition duration-300"
          >
            Join Fatimaz Community
          </button>
        </div>

        {/* Member Display */}
       {members.length > 0 && (
  <div className="max-w-6xl mx-auto mt-12">
    <h2 className="text-2xl font-bold text-center text-black mb-6">
      Fatimaz Community Members
    </h2>

    <div className="flex flex-wrap justify-center gap-6 px-4">
      {members.map((member, idx) => (
        <div
          key={idx}
          className="flex items-center gap-3 bg-green-50 border border-green-200 p-4 rounded-full shadow-md transition hover:scale-105"
        >
          <div className="bg-green-200 rounded-full p-2">
            <User className="w-6 h-6 text-green-800" />
          </div>
          <p className="text-sm font-semibold text-green-900">
            {member.fullname || member.name}
          </p>
        </div>
      ))}
    </div>
  </div>
)}

      </div>
      <Footer />
    </div>
  );
}
