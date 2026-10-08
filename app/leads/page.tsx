"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getMockLeads } from "@/lib/mocks/leads";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { Search, SlidersHorizontal, ChevronLeft, ChevronRight } from "lucide-react";
import * as motion from "framer-motion/client";

export default function LeadsPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const limit = 25;

  const { data, isLoading, isError } = useQuery({
    queryKey: ["leads", page, search],
    queryFn: async () => {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));
      return getMockLeads(page, limit, search);
    },
  });

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      className="p-8 space-y-6"
      variants={container}
      initial="hidden"
      animate="show"
    >
      <motion.div variants={item} className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Leads</h1>
          <p className="text-muted-foreground mt-1">Manage and discover potential clients.</p>
        </div>
      </motion.div>

        <motion.div variants={item} className="flex items-center gap-4 bg-card p-4 rounded-xl border hover:shadow-md transition-shadow">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input 
            placeholder="Search company..." 
            className="pl-9"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1); // Reset page on search
            }}
          />
        </div>
        <Button variant="outline" className="gap-2">
          <SlidersHorizontal className="w-4 h-4" />
          Filters
        </Button>
      </motion.div>

      <motion.div variants={item} className="rounded-xl border bg-card overflow-hidden shadow-sm">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow>
              <TableHead>Company</TableHead>
              <TableHead>Score</TableHead>
              <TableHead className="hidden md:table-cell">Industry</TableHead>
              <TableHead className="hidden lg:table-cell">Country</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right hidden sm:table-cell">Updated</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <TableRow key={i}>
                  <TableCell><Skeleton className="h-4 w-[150px]" /></TableCell>
                  <TableCell><Skeleton className="h-6 w-[50px]" /></TableCell>
                  <TableCell className="hidden md:table-cell"><Skeleton className="h-4 w-[100px]" /></TableCell>
                  <TableCell className="hidden lg:table-cell"><Skeleton className="h-4 w-[80px]" /></TableCell>
                  <TableCell><Skeleton className="h-6 w-[80px]" /></TableCell>
                  <TableCell className="text-right hidden sm:table-cell"><Skeleton className="h-4 w-[100px] ml-auto" /></TableCell>
                </TableRow>
              ))
            ) : isError ? (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  Something went wrong.
                  <Button variant="link" onClick={() => window.location.reload()}>Try Again</Button>
                </TableCell>
              </TableRow>
            ) : data?.data.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center text-muted-foreground">
                  No leads found. Try changing your filters.
                  <Button variant="link" onClick={() => setSearch("")}>Clear Search</Button>
                </TableCell>
              </TableRow>
            ) : (
              data?.data.map((lead, i) => (
                <motion.tr 
                  key={lead.id} 
                  className="cursor-pointer hover:bg-muted/50 transition-colors border-b last:border-0"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05, type: 'spring', stiffness: 300, damping: 24 }}
                >
                  <TableCell className="font-medium">
                    <Link href={`/leads/${lead.id}`} className="block py-2">
                      {lead.company.name}
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Link href={`/leads/${lead.id}`} className="block py-2">
                      <Badge variant={lead.score.total >= 90 ? "destructive" : lead.score.total >= 70 ? "secondary" : "outline"} className={lead.score.total >= 90 ? "bg-orange-500/10 text-orange-600 border-0" : ""}>
                        {lead.score.total}
                      </Badge>
                    </Link>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <Link href={`/leads/${lead.id}`} className="block py-2">
                      {lead.company.industry}
                    </Link>
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">
                    <Link href={`/leads/${lead.id}`} className="block py-2">
                      {lead.company.country}
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Link href={`/leads/${lead.id}`} className="block py-2">
                      <Badge variant="outline" className="font-normal">{lead.status}</Badge>
                    </Link>
                  </TableCell>
                  <TableCell className="text-right text-muted-foreground hidden sm:table-cell">
                    <Link href={`/leads/${lead.id}`} className="block py-2">
                      {new Date(lead.updatedAt).toLocaleDateString()}
                    </Link>
                  </TableCell>
                </motion.tr>
              ))
            )}
          </TableBody>
        </Table>
      </motion.div>

      {!isLoading && !isError && data && data.total > 0 && (
        <motion.div variants={item} className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Showing {(page - 1) * limit + 1} - {Math.min(page * limit, data.total)} of {data.total}
          </p>
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="sm"
              disabled={page === 1}
              onClick={() => setPage(p => p - 1)}
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              Previous
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              disabled={page * limit >= data.total}
              onClick={() => setPage(p => p + 1)}
            >
              Next
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
