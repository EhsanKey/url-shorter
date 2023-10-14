"use client";

import { notFound } from "next/navigation";
import { useEffect, useState } from "react";

const sendRequest = async (url: string, method: string) => {
  const res = await fetch(url, {
    method,
  });
  if (res.status === 200) return res.json();
  else throw new Error(await res.json());
};

export default function Page({ params }: { params: { surl: string } }) {
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    sendRequest(`/api/url/${params.surl}`, "GET")
      .then((res) => {
        console.log(res);
        window.location.href = res.data.url;
      })
      .catch((err) => {
        console.log(err);
        setErr(err.message);
      });
  }, []);

  if (err) return notFound();
  return (
    <div className="flex items-center justify-center h-screen text-2xl text-purple-600">
      Loading...
    </div>
  );
}
