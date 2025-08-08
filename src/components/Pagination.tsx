import { Button } from "@/components/ui/button";
import { ChevronRightIcon, ChevronLeftIcon } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onNext: () => void;
  onPrev: () => void;
}

const Pagination = ({ currentPage, totalPages, onNext, onPrev }: PaginationProps) => {
  return (
    <div className="justify-end flex gap-2">
      <Button
        variant="outline"
        onClick={onPrev}
        disabled={currentPage === 1}
        className="transition-transform duration-200 hover:scale-105"
      >
        <ChevronLeftIcon /> Prev
      </Button>
      <Button
        variant="outline"
        onClick={onNext}
        disabled={currentPage === totalPages}
        className="transition-transform duration-200 hover:scale-105"
      >
        Next <ChevronRightIcon />
      </Button>
    </div>
  );
};

export default Pagination;
