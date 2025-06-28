import { MoreHorizontal, Trash2, Plus, ChevronDown, Folder, type LucideIcon } from '@repo/ui/icons';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { folderService, type Folder as FolderType } from '../services/folder-service';
import { CreateFolderDialog } from './create-folder-dialog';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
  Button,
} from '@repo/ui';
import { NavPages, type PageItem } from './nav-pages';

export interface FolderItem {
  id?: string;
  name: string;
  url: string;
  icon: LucideIcon;
  subFolders?: FolderItem[];
  pages?: PageItem[];
  parent_id?: string | null;
}

interface FolderItemProps {
  folder: FolderItem;
  level?: number;
}

function FolderItemComponent({ folder, level = 0 }: FolderItemProps) {
  const { isMobile } = useSidebar();
  const [isOpen, setIsOpen] = useState(level === 0);
  const [isCreateFolderOpen, setIsCreateFolderOpen] = useState(false);
  const hasChildren = (folder.subFolders && folder.subFolders.length > 0) || (folder.pages && folder.pages.length > 0);

  return (
    <>
      <SidebarMenuItem>
        <div className="flex items-center w-full">
          {hasChildren && (
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-5 w-5 p-0 mr-1"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
            </Button>
          )}
          <SidebarMenuButton asChild className={hasChildren ? "flex-1" : "w-full"}>
            <Link to={folder.url}>
              <folder.icon />
              <span>{folder.name}</span>
            </Link>
          </SidebarMenuButton>
        </div>
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
            <DropdownMenuItem onClick={() => setIsCreateFolderOpen(true)}>
              <Folder className="text-muted-foreground" />
              <span>Add Subfolder</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Plus className="text-muted-foreground" />
              <span>Add Page</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Trash2 className="text-muted-foreground" />
              <span>Delete Folder</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>

      <CreateFolderDialog 
        isOpen={isCreateFolderOpen} 
        onOpenChange={setIsCreateFolderOpen} 
        parentId={folder.id} 
        onFolderCreated={() => {
          // Refresh folders after creation
          // This will be handled by the parent component
        }}
      />

      {isOpen && hasChildren && (
        <div className="ml-4">
          {folder.subFolders && folder.subFolders.length > 0 && (
            <SidebarMenu>
              {folder.subFolders.map((subFolder) => (
                <FolderItemComponent 
                  key={subFolder.name} 
                  folder={subFolder} 
                  level={level + 1} 
                />
              ))}
            </SidebarMenu>
          )}
          {folder.pages && folder.pages.length > 0 && (
            <NavPages pages={folder.pages} parentFolder={folder.url} />
          )}
        </div>
      )}
    </>
  );
}

export function NavFolder({
  folders: initialFolders,
}: {
  folders: FolderItem[];
}) {
  const [folders, setFolders] = useState<FolderItem[]>(initialFolders);
  const [isCreateFolderOpen, setIsCreateFolderOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Load folders from Supabase
  const loadFolders = async () => {
    try {
      setIsLoading(true);
      const supabaseFolders = await folderService.getAllFolders();
      
      // If we have folders from Supabase, merge them with the initial folders
      if (supabaseFolders.length > 0) {
        const mappedFolders: FolderItem[] = supabaseFolders.map(folder => ({
          id: folder.id,
          name: folder.name,
          url: `/folders/${folder.id}`,
          icon: Folder,
          parent_id: folder.parent_id
        }));
        
        // Combine with initial folders
        setFolders([...initialFolders, ...mappedFolders]);
      }
    } catch (error) {
      console.error('Error loading folders:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadFolders();
  }, []);

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <div className="flex items-center justify-between px-2">
        <SidebarGroupLabel>Folders</SidebarGroupLabel>
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-6 w-6" 
          onClick={() => setIsCreateFolderOpen(true)}
        >
          <Plus className="h-4 w-4" />
          <span className="sr-only">Add Folder</span>
        </Button>
      </div>
      <SidebarMenu>
        {folders.map((folder) => (
          <FolderItemComponent key={folder.name} folder={folder} />
        ))}
      </SidebarMenu>

      <CreateFolderDialog 
        isOpen={isCreateFolderOpen} 
        onOpenChange={setIsCreateFolderOpen} 
        onFolderCreated={loadFolders}
      />

      {isLoading && (
        <div className="flex justify-center py-2">
          <span className="text-sm text-muted-foreground">Loading folders...</span>
        </div>
      )}
    </SidebarGroup>
  );
}
