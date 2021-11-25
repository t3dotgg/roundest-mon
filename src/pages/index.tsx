import { getOptionsForVote } from "@/utils/getRandomPokemon";
import { trpc } from "@/utils/trpc";
import { useState } from "react";
import type React from "react";
import { inferQueryResponse } from "./api/trpc/[trpc]";

import Image from "next/image";
import Link from "next/link";
import Head from "next/head";

const btn =
  "inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500";

export default function Home() {
  const [ids, updateIds] = useState(() => getOptionsForVote());

  const [first, second] = ids;

  const firstPokemon = trpc.useQuery(["get-pokemon-by-id", { id: first }]);
  const secondPokemon = trpc.useQuery(["get-pokemon-by-id", { id: second }]);

  const voteMutation = trpc.useMutation(["cast-vote"]);

  const voteForRoundest = (selected: number) => {
    if (selected === first) {
      voteMutation.mutate({ votedFor: first, votedAgainst: second });
    } else {
      voteMutation.mutate({ votedFor: second, votedAgainst: first });
    }
    // todo: fire mutation to persist changes
    updateIds(getOptionsForVote());
  };

  const dataLoaded =
    !firstPokemon.isLoading &&
    firstPokemon.data &&
    !secondPokemon.isLoading &&
    secondPokemon.data;

  return (
    <div className="h-screen w-screen flex flex-col justify-between items-center relative">
      <Head>
        <title>Roundest Pokemon</title>
      </Head>
      <div className="text-2xl text-center pt-8">Which Pokémon is Rounder?</div>
      {dataLoaded && (
        <div className="border rounded p-8 flex justify-between items-center max-w-2xl">
          <PokemonListing
            pokemon={firstPokemon.data}
            vote={() => voteForRoundest(first)}
          />
          <div className="p-8">Vs</div>
          <PokemonListing
            pokemon={secondPokemon.data}
            vote={() => voteForRoundest(second)}
          />
          <div className="p-2" />
        </div>
      )}
      {!dataLoaded && <img src="/rings.svg" className="w-48" />}
      <div className="w-full text-xl text-center pb-2">
        <a href="https://github.com/TheoBr/roundest-mon">Github</a>
        {" | "}
        <Link href="/results">
          <a>Results</a>
        </Link>
      </div>
    </div>
  );
}

type PokemonFromServer = inferQueryResponse<"get-pokemon-by-id">;

const PokemonListing: React.FC<{
  pokemon: PokemonFromServer;
  vote: () => void;
}> = (props) => {
  return (
    <div className="flex flex-col items-center">
      <Image
        src={props.pokemon.spriteUrl}
        width={256}
        height={256}
        layout="fixed"
      />
      <div className="text-xl text-center capitalize mt-[-0.5rem]">
        {props.pokemon.name}
      </div>
      <button className={btn} onClick={() => props.vote()}>
        Rounder
      </button>
    </div>
  );
};
