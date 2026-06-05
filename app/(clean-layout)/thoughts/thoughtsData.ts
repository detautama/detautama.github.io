export interface Thought {
  id: string;
  content: string;
  date: string;
  image?: string;
}

export const thoughts: Thought[] = [
  {
    id: "1",
    date: "2026-06-05",
    content:
      "Hari ke-8 konsisten bersepeda ke kantor. Tidur lebih lelap, otot kaki jauh lebih kuat dari sebelumnya, dan cocok untuk latihan jantung. Sebelumnya hanya latihan otot, tidak ada kardionya. Ternyata kardio yang terasa seperti rutinitas sehari-hari jauh lebih mudah dipertahankan.",
  },
];
