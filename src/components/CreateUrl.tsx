"use client";

import { useEffect, useState } from "react";
export default function CreateUrl() {
  const [err, setErr] = useState<string | null>(null);
  const [url, setUrl] = useState<string>("");
  const [surl, setSurl] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [submit, setSubmit] = useState<boolean>(false);

  const sendRequest = async (body: { url: string }, method: string) => {
    const res = await fetch("/api/url", {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    let data = await res.json();
    setSurl(data.data.surl);

    if (res.status === 200) return data;
    else throw new Error(data.message);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);

    e.preventDefault();
    sendRequest({ url }, "POST")
      .then((res) => {
        console.log(res);
        setSurl(res.data.surl);
        setErr(null);
        setLoading(false);
      })
      .catch((err) => {
        console.log("err", err);
        setErr(err.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    const regex = /^https:\/\//;

    if (regex.test(url) && url.length > 0) {
      setSubmit(true);
    } else {
      setSubmit(false);
    }

    1;
  }, [url]);

  return (
    <div className="flex flex-col items-center px-1 md:px-10 lg:px-20">
      <form action="" onSubmit={handleSubmit} className="w-full">
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter your URL"
          className="w-full p-2 my-0.5 border-2 border-purple-600 rounded-md outline-none focus:border-purple-600"
        />

        {surl && (
          <div className="w-full flex flex-col items-start">
            <div
              className="flex items-center justify-center my-2 mt-4 w-full p-2 relative border-2 border-purple-600 rounded-md cursor-pointer after:content-['Copied!'] after:bgwhite after:text-purple-600 after:absolute after:top-[-40%] after:left-1 after:bg-white after:rounded-sm after:px-2 after:text-sm after:font-bold"
              onClick={() => {
                navigator.clipboard.writeText(surl);
              }}
            >
              <small className="text-sm font-bold text-purple-600">
                {surl}
              </small>
            </div>
            {err && (
              <span className="flex items-center justify-center mx-1 text-sm font-bold text-red-500">
                {err}
              </span>
            )}
          </div>
        )}

        <button
          type="submit"
          className={`w-full p-2 my-2 text-white bg-purple-600 rounded-md outline-none focus:outline-none
            ${
              loading || !submit
                ? "cursor-not-allowed bg-opacity-60"
                : "cursor-pointer"
            }`}
          disabled={loading || !submit}
        >
          {loading ? "Loading..." : "Shorten"}
        </button>
      </form>
    </div>
  );
}
