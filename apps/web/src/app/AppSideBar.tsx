import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Label,
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  Switch,
  useTheme,
} from '@repo/ui';
import { ChevronDown } from '@repo/ui/icons';

export function AppSidebar() {
  const { theme, setTheme } = useTheme();

  return (
    <Sidebar className="flex-col justify-between">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  Select Vaults
                  <ChevronDown className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-[--radix-popper-anchor-width]">
                <DropdownMenuItem>
                  <span>Acme Inc</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>Acme Corp.</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="p-4">
        <div className="flex gap-4">
          <Switch
            id="theme-mode"
            onCheckedChange={() => {
              setTheme(theme !== 'light' ? 'light' : 'dark');
            }}
          />
          <Label htmlFor="theme-mode">
            {theme.substring(0, 1).toUpperCase() + theme.substring(1)}
          </Label>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}
