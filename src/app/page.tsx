"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase";
import { Competition } from "@/lib/types";

export default function Home() {
  const [competitions, setCompetitions] = useState<Competition[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCompetitions() {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("competitions")
        .select("*")
        .order("date", { ascending: true });

      if (error) {
        console.error("Chyba při načítání závodů:", error);
      } else {
        setCompetitions(data || []);
      }
      setLoading(false);
    }

    fetchCompetitions();
  }, []);

  if (loading) {
    return <p className="text-center py-8">Načítám závody...</p>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Nadcházející závody</h1>

      {competitions.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <p>Zatím nejsou vypsané žádné závody.</p>
          <Link
            href="/zavody/novy"
            className="text-green-700 underline mt-2 inline-block"
          >
            Vytvořit první závod
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {competitions.map((competition) => (
            <Link
              key={competition.id}
              href={`/zavody/${competition.id}`}
              className="block border rounded-lg p-4 hover:bg-gray-50 transition"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-xl font-semibold">{competition.name}</h2>
                  <p className="text-gray-600">{competition.location}</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-medium">
                    {new Date(competition.date).toLocaleDateString("cs-CZ", {
                      weekday: "long",
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
