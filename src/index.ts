import { Elysia, t } from "elysia";
import cors from "@elysiajs/cors";
import { staticPlugin } from "@elysiajs/static";

const app = new Elysia();

app.use(cors());
app.use(staticPlugin());

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
  { params: t.Object({ name: t.String() }) },
);

app.listen(3000, () => {
  console.log("🦊 Elysia is running http://localhost:3000");
});
