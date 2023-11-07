import { useState, useEffect } from "react";

import { copy, linkIcon, loader, tick, send } from "../assets";

const Demo = () => {
  const [article, setArticle] = useState({ url: "", summary: "" });

  const handleSubmit = async (e) => {
    alert("Hello", e);
  };

  return (
    <section className="mt-16 max-w-xl w-full">
      <div className="flex flex-col w-full">
        <div className="flex flex-col w-full gap-2">
          <form
            className="relative flex justify-center items-center"
            onSubmit={handleSubmit}
          >
            <img src={linkIcon} className="absolute left-0 my-2 ml-3 w-5" />
            <input
              type="url"
              placeholder="Enter the URL"
              value={article.url}
              onChange={(e) => setArticle({ ...article, url: e.target.value })}
              required
              className="url_input peer"
            />

            <button type="submit" className="submit_btn">
              <img src={send} className="rounded w-8 h-8" />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Demo;
