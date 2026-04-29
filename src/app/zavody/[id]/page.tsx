"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase";
import { Competition, Registration } from "@/lib/types";

export default function DetailZavodu() {
  const params = useParams();
  const router = useRouter();
  const [competition, setCompetition] = useState<Competition | null>(null);
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    rider_name: "",
    horse_name: "",
    category: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    async function fetchData() {
      const supabase = createClient();

      // Načti závod
      const { data: comp, error: compError } = await supabase
        .from("competitions")
        .select("*")
        .eq("id", params.id)
        .single();

      if (compError) {
        console.error("Chyba při načítání závodu:", compError);
        setLoading(false);
        return;
      }

      setCompetition(comp);

      // Načti přihlášky
      const { data: regs, error: regsError } = await supabase
        .from("registrations")
        .select("*")
        .eq("competition_id", params.id)
        .order("created_at", { ascending: true });

      if (regsError) {
        console.error("Chyba při načítání přihlášek:", regsError);
      } else {
        setRegistrations(regs || []);
      }

      setLoading(false);
    }

    fetchData();
  }, [params.id]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);

    const supabase = createClient();
    const { data, error } = await supabase
      .from("registrations")
      .insert([{ ...formData, competition_id: Number(params.id) }])
      .select()
      .single();

    if (error) {
      console.error("Chyba při přihlašování:", error);
      alert("Nepodařilo se přihlásit");
    } else {
      setRegistrations([...registrations, data]);
      setFormData({
        rider_name: "",
        horse_name: "",
        category: "",
        email: "",
        phone: "",
      });
      setShowForm(false);
    }
    setSubmitting(false);
  }

  async function handleDelete() {
    if (!confirm("Opravdu chcete smazat tento závod?")) return;

    const supabase = createClient();
    const { error } = await supabase
      .from("competitions")
      .delete()
      .eq("id", params.id);

    if (error) {
      console.error("Chyba při mazání:", error);
      alert("Nepodařilo se smazat závod");
    } else {
      router.push("/");
    }
  }

  if (loading) {
    return <p className="text-center py-8">Načítám...</p>;
  }

  if (!competition) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">Závod nenalezen</p>
        <Link href="/" className="text-green-700 underline">
          Zpět na seznam
        </Link>
      </div>
    );
  }

  return (
    <div>
      <Link href="/" className="text-green-700 hover:underline mb-4 inline-block">
        ← Zpět na seznam
      </Link>

      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-2xl font-bold">{competition.name}</h1>
          <p className="text-gray-600">{competition.location}</p>
          <p className="text-lg mt-2">
            {new Date(competition.date).toLocaleDateString("cs-CZ", {
              weekday: "long",
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>
        </div>
        <button
          onClick={handleDelete}
          className="text-red-600 hover:text-red-800 text-sm"
        >
          Smazat závod
        </button>
      </div>

      {competition.description && (
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <h2 className="font-semibold mb-2">Popis a pravidla</h2>
          <p className="whitespace-pre-wrap">{competition.description}</p>
        </div>
      )}

      <div className="border-t pt-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">
            Přihlášení jezdci ({registrations.length})
          </h2>
          {!showForm && (
            <button
              onClick={() => setShowForm(true)}
              className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800"
            >
              + Přihlásit se
            </button>
          )}
        </div>

        {showForm && (
          <form
            onSubmit={handleSubmit}
            className="bg-green-50 rounded-lg p-4 mb-6 space-y-4"
          >
            <h3 className="font-semibold">Přihláška na závod</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Jméno jezdce
                </label>
                <input
                  type="text"
                  required
                  value={formData.rider_name}
                  onChange={(e) =>
                    setFormData({ ...formData, rider_name: e.target.value })
                  }
                  className="w-full border rounded px-3 py-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Jméno koně
                </label>
                <input
                  type="text"
                  required
                  value={formData.horse_name}
                  onChange={(e) =>
                    setFormData({ ...formData, horse_name: e.target.value })
                  }
                  className="w-full border rounded px-3 py-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Kategorie
                </label>
                <input
                  type="text"
                  required
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                  className="w-full border rounded px-3 py-2"
                  placeholder="např. Parkur 80cm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full border rounded px-3 py-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Telefon (volitelné)
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  className="w-full border rounded px-3 py-2"
                />
              </div>
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                disabled={submitting}
                className="bg-green-700 text-white px-6 py-2 rounded hover:bg-green-800 disabled:opacity-50"
              >
                {submitting ? "Odesílám..." : "Odeslat přihlášku"}
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="border px-6 py-2 rounded hover:bg-gray-50"
              >
                Zrušit
              </button>
            </div>
          </form>
        )}

        {registrations.length === 0 ? (
          <p className="text-gray-500 text-center py-4">
            Zatím se nikdo nepřihlásil
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 px-2">Jezdec</th>
                  <th className="text-left py-2 px-2">Kůň</th>
                  <th className="text-left py-2 px-2">Kategorie</th>
                  <th className="text-left py-2 px-2">Kontakt</th>
                </tr>
              </thead>
              <tbody>
                {registrations.map((reg) => (
                  <tr key={reg.id} className="border-b">
                    <td className="py-2 px-2">{reg.rider_name}</td>
                    <td className="py-2 px-2">{reg.horse_name}</td>
                    <td className="py-2 px-2">{reg.category}</td>
                    <td className="py-2 px-2">
                      <span className="text-sm">{reg.email}</span>
                      {reg.phone && (
                        <span className="text-sm text-gray-500 block">
                          {reg.phone}
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
