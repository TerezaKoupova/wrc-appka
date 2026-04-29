"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase";

export default function NovyZavod() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    date: "",
    location: "",
    description: "",
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const supabase = createClient();
    const { error } = await supabase.from("competitions").insert([formData]);

    if (error) {
      console.error("Chyba při vytváření závodu:", error);
      alert("Nepodařilo se vytvořit závod");
    } else {
      router.push("/");
    }
    setLoading(false);
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Nový závod</h1>

      <form onSubmit={handleSubmit} className="space-y-4 max-w-lg">
        <div>
          <label className="block text-sm font-medium mb-1">Název závodu</label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full border rounded px-3 py-2"
            placeholder="např. Jarní parkur"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Datum</label>
          <input
            type="date"
            required
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Místo</label>
          <input
            type="text"
            required
            value={formData.location}
            onChange={(e) =>
              setFormData({ ...formData, location: e.target.value })
            }
            className="w-full border rounded px-3 py-2"
            placeholder="např. JK Mustang, Praha"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Popis a pravidla
          </label>
          <textarea
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            className="w-full border rounded px-3 py-2 h-32"
            placeholder="Informace o závodu, pravidla, kategorie..."
          />
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={loading}
            className="bg-green-700 text-white px-6 py-2 rounded hover:bg-green-800 disabled:opacity-50"
          >
            {loading ? "Ukládám..." : "Vytvořit závod"}
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            className="border px-6 py-2 rounded hover:bg-gray-50"
          >
            Zrušit
          </button>
        </div>
      </form>
    </div>
  );
}
