import * as trpc from "@trpc/server";
import { z } from "zod";
import { prisma } from "@/backend/utils/prisma";
import { getOptionsForVote } from "@/utils/getRandomPokemon";

export const appRouter = trpc
  .router()
  .query("get-pokemon-pair", {
    async resolve() {
      const [first, second] = getOptionsForVote();

      const firstPokemon = await prisma.pokemon.findFirst({
        where: { id: first },
      });

      // TODO: Use some math to make the pairing more meaningful
      // Related issue - https://github.com/TheoBr/roundest-mon/issues/1
      const secondPokemon = await prisma.pokemon.findFirst({
        where: { id: second },
      });

      if (!firstPokemon || !secondPokemon) throw new Error("lol doesn't exist");

      return { firstPokemon, secondPokemon };
    },
  })
  .mutation("cast-vote", {
    input: z.object({
      votedFor: z.number(),
      votedAgainst: z.number(),
    }),
    async resolve({ input }) {
      const voteInDb = await prisma.vote.create({
        data: {
          votedAgainstId: input.votedAgainst,
          votedForId: input.votedFor,
        },
      });
      return { success: true, vote: voteInDb };
    },
  });

// export type definition of API
export type AppRouter = typeof appRouter;
