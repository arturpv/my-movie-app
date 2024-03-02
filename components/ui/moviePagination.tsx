// components/ui/MoviePagination.tsx

import React from 'react';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from './pagination';

interface MoviePaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const MoviePagination: React.FC<MoviePaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious onClick={() => onPageChange(currentPage - 1)} />
        </PaginationItem>
        {[...Array(totalPages)].map((_, index) => (
          <PaginationItem key={index}>
            <PaginationLink
              href="#"
              className={currentPage === index + 1 ? 'bg-blue-500 text-white' : ''}
              onClick={() => onPageChange(index + 1)}
            >
              {index + 1}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationNext onClick={() => onPageChange(currentPage + 1)} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default MoviePagination;
