import { Elysia, t } from "elysia";
import cors from "@elysiajs/cors";
import { swagger } from "@elysiajs/swagger";

import { staticPlugin } from "@elysiajs/static";

const app = new Elysia();

app.use(cors());
app.use(staticPlugin());

app.use(
  swagger({
    path: "/docs",
    documentation: {
      info: {
        title: "API di Libri",
        version: "1.0.0",
        description: "Una semplice API che utilizza Google Books API.",
      },
      tags: [{ name: "Books", description: "Endpoints correlati ai libri" }],
    },
  }),
);

interface Book {
  title: string;
  authors: string[];
  description: string;
  infoLink: string;
  thumbnail: string;
}

interface VolumeInfo {
  title: string;
  authors?: string[];
  description?: string;
  infoLink: string;
  imageLinks?: {
    thumbnail: string;
  };
}

interface GoogleBooksAPIResponse {
  items: {
    volumeInfo: VolumeInfo;
  }[];
}

app.get("/", () => Bun.file("public/index.html"));

app.get(
  "/books/:name",
  async ({ params, set, error }) => {
    const path = params.name;

    if (!path) {
      set.status = 400;
      return "The parameter is required.";
    }

    try {
      const url = `https://www.googleapis.com/books/v1/volumes?q=${path}`;
      const response = await fetch(url, { method: "GET" });
      const data: GoogleBooksAPIResponse = await response.json();

      if (!data.items) {
        set.status = 404;
        return `No books found.`;
      }

      const books: Book[] = data.items.map((item) => ({
        title: item.volumeInfo.title,
        authors: item.volumeInfo.authors || ["N/A"],
        description: item.volumeInfo.description || "N/A",
        infoLink: item.volumeInfo.infoLink,
        thumbnail: item.volumeInfo.imageLinks?.thumbnail || "N/A",
      }));

      set.status = 200;
      return { books };
    } catch (err) {
      return error(500, "Internal error");
    }
  },
  {
    params: t.Object({ name: t.String() }),
    detail: {
      tags: ["Books"],
      summary: "Cerca libri per nome",
      description: "Questo endpoint restituisce una lista di libri in base al nome fornito.",
    },
  },
);

app.listen(3000, () => {
  console.log("🦊 Elysia is running http://localhost:3000");
});
