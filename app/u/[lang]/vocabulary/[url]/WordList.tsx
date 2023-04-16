"use client";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import VocabularyItem from "./VocabularyItem";
import Context from "./Context";

export default function WordList({ words }: { words: Array<any> }) {
  const [selectedId, setSelectedId] = useState(null);
//   const handleClose = useCallback(() => {
//     setSelectedId(false);
//   }, []);

  return (
    <div className="relative">
    <LayoutGroup>
      <div className="flex flex-wrap gap-2">
        {words.map((item) => {
          return (
            <VocabularyItem
              key={item.id}
              id={item.id}
              onclick={() => setSelectedId(item.id)}
              word={item.word}
              part={item.part}
              meaning={item.meaning}
              audio={item.audio}
              image={item.image}
            />
          );
        })}
      </div>

    <AnimatePresence>
        {selectedId && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/3 z-50">
          <Context id={selectedId} key="modal" close={() => setSelectedId(null)} />
          </div>
        )}
    </AnimatePresence>
    </LayoutGroup>
    </div>
  );
}
