import Block from "@utils/Block";

export default async function Home({ params }: any) {
  const lang = params.lang;
  return (
    <div className="flex flex-wrap gap-10 m-10">
    <Block link={`/u/${lang}/alphabet`}>Alphabet</Block>
    <Block link={`/u/${lang}/vocabulary`}>Vocabulary</Block>
    <Block link={`/u/${lang}/grammar`}>Grammar</Block>
    <Block link={`/u/${lang}/custom`}>Custom</Block>
    </div>
    )
}



