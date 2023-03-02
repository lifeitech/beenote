import getclient from '@utils/pb-server';
import Alphabet from './Alphabet';
import CreateAlphabet from './CreateAlphabet';
import {CreateCategory, CategoryTitle} from './Category';

export default async function Home({ params }: any) {
  const lang = params.lang;
  const client = getclient();
  const alphabets = await client.collection('alphabet').getFullList(1, {filter: `lang="${lang}"`});
  const categories = alphabets.map(item => item.category).filter((v,i,self) => self.indexOf(v) == i);

  return (
    <div className="ml-5">
    <h1 className="text-3xl font-bold">Alphabets</h1>

    {categories.map(cat => {

      const alphabets_cat = alphabets.filter(item => item.category == cat);

      return (
          <>
          <CategoryTitle lang={lang} title={cat}/>
          {/* <h2 className="text-2xl font-bold mt-5 mb-5">{cat == 'default' ? '' : cat}</h2> */}
          <div className="flex flex-wrap gap-2 lg:grid lg:gap-10 lg:grid-cols-5 lg:max-w-4xl">
          {alphabets_cat.map(item => { 
            return <Alphabet key={item.id}
                            id = {item.id}
                            alphabet={item.alphabet} 
                            pronun={item.pronun}
                            audio={item.audio}
                    />;
          })}

          <CreateAlphabet category={cat} lang={lang}/>
          </div>
          </>
        );
      })}


    <CreateCategory lang={lang}/>

    </div>

    )
}