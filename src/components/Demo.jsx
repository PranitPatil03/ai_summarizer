import { useState, useEffect } from "react";

import { copy, linkIcon, loader, tick, send } from "../assets";

import { useLazyGetSummaryQuery } from "../services/Article";

const Demo = () => {
  const [getSummary, { error, isFetching }] = useLazyGetSummaryQuery();

  const [article, setArticle] = useState({ url: "", summary: "" });
  const [allArticle, setAllArticle] = useState([]);

  useEffect(() => {
    const articlesFromLocalStorage = JSON.parse(
      localStorage.getItem("articles")
    );

    if (articlesFromLocalStorage) {
      setAllArticle(articlesFromLocalStorage);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { data } = await getSummary({
      articleUrl: article.url,
      summarize: true,
      summarize_language: "auto",
    });

    if (data?.article.summary) {
      const newArticle = { ...article, summary: data?.article.summary };
      const updateAllArticles = [newArticle, ...allArticle];
      setArticle(newArticle);
      setAllArticle(updateAllArticles);

      localStorage.setItem("articles", JSON.stringify(updateAllArticles));
    }
  };

  return (
    <section className="mt-16 max-w-xl w-full">
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

        {/* List */}

        <div className="flex flex-col gap-1 max-h-60 overflow-y-auto">
          {allArticle.map((item, index) => (
            <div
              className="link_card"
              key={index}
              onClick={() => setArticle(item)}
            >
              <div className="copy_btn">
                <img src={copy} className="w-[40%] h-[40%] object-contain" />
              </div>
              <p className="flex-1 font-satoshi text-blue-700 font-medium text-sm truncate">
                {item.url}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="my-10 flex justify-center items-center max-w-full">
        {isFetching ? (
          <img src={loader} className="w-20 h-20 object-contain" />
        ) : error ? (
          <p className="font-inter font-bold text-black text-center">
            Well something wrong happened
            <br />
            <span className="font-satoshi font-normal text-grey-700">
              {error?.data?.error}
            </span>
          </p>
        ) : (
          article.summary && (
            <div className="flex flex-col gap-3">
              <h2 className="font-satoshi font-bold text-gray-600 text-xl">
                Article <span className="blue_gradient">Summary</span>
              </h2>

              <div className="summary_box">
                <p className="font-inter font-medium text-sm text-grey-700 text-justify">
                  {article.summary}
                </p>
              </div>
            </div>
          )
        )}
      </div>
    </section>
  );
};

export default Demo;
