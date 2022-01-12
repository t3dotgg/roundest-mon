import type { GetServerSideProps } from "next";
import { prisma } from "@/backend/utils/prisma";
import { AsyncReturnType } from "@/utils/ts-bs";

import Image from "next/image";
import Head from "next/head";

const getPokemonInOrder = async () => {
  return await prisma.pokemon.findMany({
    orderBy: {
      VoteFor: { _count: "desc" },
    },
    select: {
      id: true,
      name: true,
      spriteUrl: true,
      _count: {
        select: {
          VoteFor: true,
          VoteAgainst: true,
        },
      },
    },
  });
};

type PokemonQueryResult = AsyncReturnType<typeof getPokemonInOrder>;

const generateCountPercent = (pokemon: PokemonQueryResult[number]) => {
  const { VoteFor, VoteAgainst } = pokemon._count;
  if (VoteFor + VoteAgainst === 0) {
    return 0;
  }
  return (VoteFor / (VoteFor + VoteAgainst)) * 100;
};

const PokemonListing: React.FC<{ pokemon: PokemonQueryResult[number], rank: number }> = ({
  pokemon,
  rank,
}) => {
  return (
    <div className="relative flex border-b p-2 items-center justify-between">
      <div className="flex items-center">
         <div className="flex items-center pl-4">
          <Image
            src={pokemon.spriteUrl}
            width={64}
            height={64}
            layout="fixed"
          />
          <div className="pl-2 capitalize">{pokemon.name}</div>
        </div>
      </div>
      <div className="pr-4">
        {generateCountPercent(pokemon).toFixed(2) + "%"}
      </div>
      <div className="absolute top-0 left-0 z-20 flex items-center justify-center px-2 font-semibold text-white bg-gray-600 border border-gray-500 shadow-lg rounded-br-md">
        {rank}
      </div>
    </div>
  );
};

const ResultsPage: React.FC<{
  pokemon: PokemonQueryResult;
}> = (props) => {
  return (
    <div className="flex flex-col items-center">
      <Head>
        <title>Roundest Pokemon Results</title>
      </Head>
      <h2 className="text-2xl p-4">Results</h2>
      <div className="flex flex-col w-full max-w-2xl border">
        {props.pokemon
          .sort((a, b) => {
            const difference =
              generateCountPercent(b) - generateCountPercent(a);

            if (difference === 0) {
              return b._count.VoteFor - a._count.VoteFor;
            }

            return difference;
          })
          .map((currentPokemon, index) => {
            return <PokemonListing pokemon={currentPokemon} key={index} rank={index + 1} />;
          })}
      </div>
    </div>
  );
};

export default ResultsPage;

export const getStaticProps: GetServerSideProps = async () => {
  const pokemonOrdered = await getPokemonInOrder();
  const DAY_IN_SECONDS = 60 * 60 * 24;
  return { props: { pokemon: pokemonOrdered }, revalidate: DAY_IN_SECONDS };
};
