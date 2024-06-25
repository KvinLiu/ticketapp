"use client";

import { Button } from "./ui/button";
import {
  ChevronFirst,
  ChevronLast,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useSearchParams, useRouter } from "next/navigation";

interface Props {
  itemCount: number;
  pageSize: number;
  currentPage: number;
}

const Pagination = ({ itemCount, pageSize, currentPage }: Props) => {
  const pageCount = Math.ceil(itemCount / pageSize);
  const router = useRouter();
  const searchParams = useSearchParams();
  if (pageCount <= 1) return null;

  const chagnePage = (page: number) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("page", page.toString());
    router.push(`?${newParams.toString()}`);
  };

  return (
    <div className="mt-4">
      <div>
        <Button
          variant="outline"
          disabled={currentPage === 1}
          onClick={() => chagnePage(1)}
        >
          <ChevronFirst />
        </Button>
        <Button
          variant="outline"
          disabled={currentPage === 1}
          onClick={() => chagnePage(pageCount - 1)}
        >
          <ChevronLeft />
        </Button>
        <Button
          variant="outline"
          disabled={currentPage === pageCount}
          onClick={() => chagnePage(pageCount + 1)}
        >
          <ChevronRight />
        </Button>
        <Button
          variant="outline"
          disabled={currentPage === pageCount}
          onClick={() => chagnePage(pageCount)}
        >
          <ChevronLast />
        </Button>
      </div>
      <div>
        <p>
          Page {currentPage} of {pageCount}
        </p>
      </div>
    </div>
  );
};

export default Pagination;
