import React, { useEffect, useState } from 'react';

import { Card, FormField, Loader } from '../components';
import { useTranslation } from 'react-i18next';

const RenderCards = ({ data, title }) => {
  if (data?.length > 0) {
    return (
      data.map((post) => <Card key={post._id} {...post} />)
    );
  }

  return (
    <h2 className="mt-5 font-bold text-[#6469ff] text-xl uppercase">{title}</h2>
  );
};

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [allPosts, setAllPosts] = useState(null);

  const [searchText, setSearchText] = useState('');
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState(null);
  const { t } = useTranslation();
  const fetchPosts = async () => {
    setLoading(true);

    try {
      const response = await fetch('http://play.madgames.ir:27900/api/v1/post', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const result = await response.json();
        setAllPosts(result.data.reverse());
      }
    } catch (err) {
      alert(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    setSearchTimeout(
      setTimeout(() => {
        const searchResult = allPosts.filter((item) => item.name.toLowerCase().includes(searchText.toLowerCase()) || item.prompt.toLowerCase().includes(searchText.toLowerCase()));
        setSearchedResults(searchResult);
      }, 500),
    );
  };

  return (
    <section className="max-w-7xl mx-auto">
        <div>
        <h1 className="font-extrabold text-[#5d0694] text-[32px]">{t('home-title')}</h1>
            <p className="mt-2 text-[#666e75] text-[14px] max-w-[500px]">
              {t('home-des')}
            </p>
        </div>

      <div className="mt-16">
        <FormField
          labelName={t('search-posts')}
          type="text"
          name="text"
          placeholder={t('search-ph')}
          value={searchText}
          handleChange={handleSearchChange}
        />
      </div>

      <div className="mt-10">
        {loading ? (
          <div className="flex justify-center items-center">
            <Loader />
          </div>
        ) : (
          <>
            {searchText && (
              <h2 className="font-medium text-[#5d0694] text-xl mb-3">
                {t('showing-res')} <span className="text-[#5d0694]">{searchText}</span>:
              </h2>
            )}
            <div className="grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-3 text-[#5d0694]">
              {searchText ? (
                <RenderCards
                  data={searchedResults}
                  title={t('search-not')}
                />
              ) : (
                <RenderCards
                  data={allPosts}
                  title={t('search-yet')}
                />
              )}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Home;
