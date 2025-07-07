import { MoreHorizontal, Trash2, type LucideIcon } from '@repo/ui/icons';
import { FileText } from 'lucide-react';
import { Link } from 'react-router-dom';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@repo/ui';

export interface PageItem {
  name: string;
  url: string;
  icon?: LucideIcon;
}

export function NavPages({
  pages,
  parentFolder,
}: {
  pages: PageItem[];
  parentFolder: string;
}) {
  const { isMobile } = useSidebar();

  return (
    <SidebarMenu className="ml-4">
      {pages.map((page) => (
        <SidebarMenuItem key={page.name}>
          <SidebarMenuButton asChild>
            <Link to={page.url || `${parentFolder}/${page.name.toLowerCase()}`}>
              {page.icon ? <page.icon /> : <FileText className="h-4 w-4" />}
              <span>{page.name}</span>
            </Link>
          </SidebarMenuButton>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuAction showOnHover>
                <MoreHorizontal />
                <span className="sr-only">More</span>
              </SidebarMenuAction>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-48 rounded-lg"
              side={isMobile ? 'bottom' : 'right'}
              align={isMobile ? 'end' : 'start'}
            >
              <DropdownMenuItem>
                <Trash2 className="text-muted-foreground" />
                <span>Delete Page</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}