import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { ConversationList } from "@/components/dashboard/ConversationList";
import { ConversationView } from "@/components/dashboard/ConversationView";
import { ContactDetails } from "@/components/dashboard/ContactDetails";
import type { Lead, Message } from "@/types/dashboard";

// Mock data for demonstration
const mockLeads: Lead[] = [
  {
    id: "1",
    name: "Anna Johansson",
    email: "anna.johansson@företag.se",
    phone: "+46 70 123 4567",
    company: "TechStart AB",
    status: "hot",
    lastMessage: "Jag är mycket intresserad av ert erbjudande och vill boka ett möte...",
    lastMessageTime: new Date(Date.now() - 1000 * 60 * 15),
    unread: true,
    avatar: "AJ",
    tags: ["Nytt möte", "Prioritet"],
  },
  {
    id: "2",
    name: "Erik Lindberg",
    email: "erik@lindbergconsulting.se",
    phone: "+46 73 456 7890",
    company: "Lindberg Consulting",
    status: "warm",
    lastMessage: "Tack för informationen, jag återkommer nästa vecka.",
    lastMessageTime: new Date(Date.now() - 1000 * 60 * 60 * 2),
    unread: true,
    avatar: "EL",
    tags: ["Uppföljning"],
  },
  {
    id: "3",
    name: "Maria Svensson",
    email: "maria.s@innovatehub.com",
    phone: "+46 76 789 0123",
    company: "InnovateHub",
    status: "new",
    lastMessage: "Hej! Jag såg er annons och undrar vad ni kan erbjuda...",
    lastMessageTime: new Date(Date.now() - 1000 * 60 * 60 * 5),
    unread: false,
    avatar: "MS",
    tags: [],
  },
  {
    id: "4",
    name: "Johan Andersson",
    email: "j.andersson@byggsmart.se",
    phone: "+46 70 234 5678",
    company: "ByggSmart Sverige",
    status: "cold",
    lastMessage: "Vi har precis påbörjat vår budgetplanering för nästa år...",
    lastMessageTime: new Date(Date.now() - 1000 * 60 * 60 * 24),
    unread: false,
    avatar: "JA",
    tags: ["Budget 2025"],
  },
  {
    id: "5",
    name: "Sara Nilsson",
    email: "sara@digitalfirst.se",
    phone: "+46 72 345 6789",
    company: "Digital First",
    status: "hot",
    lastMessage: "Perfekt! Tisdag kl 14 fungerar utmärkt för oss.",
    lastMessageTime: new Date(Date.now() - 1000 * 60 * 60 * 48),
    unread: false,
    avatar: "SN",
    tags: ["Möte bokat"],
  },
];

const mockMessages: Record<string, Message[]> = {
  "1": [
    {
      id: "m1",
      content: "Hej! Jag såg er tjänst readspond och är nyfiken på hur det kan hjälpa vårt säljteam.",
      sender: "lead",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
      channel: "email",
    },
    {
      id: "m2",
      content: "Hej Anna! Tack för ditt intresse. readspond automatiserar era lead-uppföljningar via Email, SMS och WhatsApp. Vill du boka ett demo-möte?",
      sender: "ai",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 23),
      channel: "email",
    },
    {
      id: "m3",
      content: "Ja gärna! Vilka tider har ni lediga nästa vecka?",
      sender: "lead",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
      channel: "email",
    },
    {
      id: "m4",
      content: "Jag är mycket intresserad av ert erbjudande och vill boka ett möte så snart som möjligt.",
      sender: "lead",
      timestamp: new Date(Date.now() - 1000 * 60 * 15),
      channel: "sms",
    },
  ],
  "2": [
    {
      id: "m5",
      content: "Hej, kan ni berätta mer om prissättningen?",
      sender: "lead",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48),
      channel: "whatsapp",
    },
    {
      id: "m6",
      content: "Absolut Erik! Vi har tre olika paket anpassade för olika företagsstorlekar. Vårt startpaket börjar från 499 kr/mån.",
      sender: "ai",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 47),
      channel: "whatsapp",
    },
    {
      id: "m7",
      content: "Tack för informationen, jag återkommer nästa vecka.",
      sender: "lead",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
      channel: "whatsapp",
    },
  ],
};

export default function Dashboard() {
  const [leads] = useState<Lead[]>(mockLeads);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [showContactDetails, setShowContactDetails] = useState(true);
  const [filter, setFilter] = useState<"all" | "unread" | "hot" | "new">("all");
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/login");
      }
    };
    checkAuth();
  }, [navigate]);

  useEffect(() => {
    if (selectedLead) {
      setMessages(mockMessages[selectedLead.id] || []);
    }
  }, [selectedLead]);

  const filteredLeads = leads.filter((lead) => {
    if (filter === "all") return true;
    if (filter === "unread") return lead.unread;
    if (filter === "hot") return lead.status === "hot";
    if (filter === "new") return lead.status === "new";
    return true;
  });

  const handleSendMessage = (content: string, channel: "email" | "sms" | "whatsapp") => {
    if (!selectedLead) return;
    const newMessage: Message = {
      id: `m${Date.now()}`,
      content,
      sender: "user",
      timestamp: new Date(),
      channel,
    };
    setMessages([...messages, newMessage]);
  };

  return (
    <div className="h-screen flex bg-background">
      <Sidebar />
      
      <div className="flex-1 flex">
        {/* Conversation List */}
        <ConversationList
          leads={filteredLeads}
          selectedLead={selectedLead}
          onSelectLead={setSelectedLead}
          filter={filter}
          onFilterChange={setFilter}
        />

        {/* Conversation View */}
        <ConversationView
          lead={selectedLead}
          messages={messages}
          onSendMessage={handleSendMessage}
          onToggleDetails={() => setShowContactDetails(!showContactDetails)}
        />

        {/* Contact Details */}
        {selectedLead && showContactDetails && (
          <ContactDetails lead={selectedLead} onClose={() => setShowContactDetails(false)} />
        )}
      </div>
    </div>
  );
}
