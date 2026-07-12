/**
 * @velora/core
 *
 * Premium React UI Ecosystem
 * https://velora.dev
 */

// ─── Theme ───────────────────────────────────────────────────────────────────
export {
  ThemeProvider,
  ThemeScript,
  useTheme,
} from "./theme/ThemeProvider";
export type {
  VeloraTheme,
  ThemeContextValue,
  ThemeProviderProps,
} from "./theme/ThemeProvider";

// ─── Tokens ──────────────────────────────────────────────────────────────────
export {
  palette,
  semanticColors,
  spacing,
  typography,
  radius,
  shadows,
  motion,
  zIndex,
  breakpoints,
  blur,
} from "./tokens";
export type {
  PaletteColor,
  SemanticColor,
  Spacing,
  Radius,
  Shadow,
  ZIndex,
} from "./tokens";

// ─── Motion ──────────────────────────────────────────────────────────────────
export {
  transitions,
  fadeVariants,
  scaleVariants,
  scaleUpVariants,
  slideUpVariants,
  slideDownVariants,
  slideLeftVariants,
  slideRightVariants,
  dialogVariants,
  overlayVariants,
  drawerVariants,
  toastVariants,
  accordionVariants,
  staggerContainerVariants,
  staggerItemVariants,
  pageVariants,
  popoverVariants,
  tooltipVariants,
  shimmerVariants,
  floatingVariants,
  hoverLiftVariants,
  rippleVariants,
} from "./motion/variants";

// ─── Utilities ────────────────────────────────────────────────────────────────
export {
  cn,
  composeRefs,
  composeEventHandlers,
  formatFileSize,
  generateId,
  typedEntries,
  isObject,
  throttle,
  clamp,
  mapRange,
} from "./utils";

// ─── Hooks ───────────────────────────────────────────────────────────────────
export {
  useDebounce,
  useLocalStorage,
  useMediaQuery,
  useIsMobile,
  useIsTablet,
  useIsDesktop,
  usePrefersDark,
  usePrefersReducedMotion,
  useClickOutside,
  useIntersectionObserver,
  useCountUp,
  useCopyToClipboard,
  useToggle,
  useKeyboard,
  usePrevious,
  useScrollLock,
} from "./hooks";

// ─── Components ───────────────────────────────────────────────────────────────

// Button
export { Button, buttonVariants } from "./components/button/Button";
export type { ButtonProps } from "./components/button/Button";

// Input
export { Input, inputWrapperVariants } from "./components/input/Input";
export type { InputProps } from "./components/input/Input";

// Card
export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  CardDivider,
  cardVariants,
} from "./components/card/Card";
export type { CardProps } from "./components/card/Card";

// Badge
export { Badge, badgeVariants } from "./components/badge/Badge";
export type { BadgeProps } from "./components/badge/Badge";

// Avatar
export { Avatar, AvatarGroup, avatarVariants } from "./components/avatar/Avatar";
export type { AvatarProps, AvatarGroupProps, AvatarStatus } from "./components/avatar/Avatar";

// Dialog
export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogBody,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from "./components/dialog/Dialog";

// Toast
export { ToastProvider, useToast } from "./components/toast/Toast";
export type { ToastData, ToastVariant, ToastPosition, ToastProviderProps } from "./components/toast/Toast";

// Skeleton
export {
  Skeleton,
  SkeletonText,
  SkeletonAvatar,
  SkeletonCard,
  SkeletonTable,
} from "./components/skeleton/Skeleton";
export type { SkeletonProps } from "./components/skeleton/Skeleton";

// Tabs
export { Tabs, TabsList, TabsTrigger, TabsContent } from "./components/tabs/Tabs";

// Select
export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
} from "./components/select/Select";

// Switch
export { Switch } from "./components/switch/Switch";
export type { SwitchProps } from "./components/switch/Switch";

// Tooltip
export {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
  SimpleTooltip,
} from "./components/tooltip/Tooltip";

// Accordion
export {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "./components/accordion/Accordion";

// Progress
export { Progress, CircularProgress } from "./components/progress/Progress";
export type { ProgressProps, CircularProgressProps } from "./components/progress/Progress";

// Checkbox
export { Checkbox } from "./components/checkbox/Checkbox";
export type { CheckboxProps } from "./components/checkbox/Checkbox";

// Dropdown Menu
export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuGroup,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuRadioGroup,
} from "./components/dropdown/DropdownMenu";

// Table
export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
  TableEmpty,
  DataTable,
} from "./components/table/Table";
export type { TableColumn, SortDirection, DataTableProps } from "./components/table/Table";

// Form
export {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  FormSection,
  useFormField,
} from "./components/form/Form";
export type { FormFieldProps } from "./components/form/Form";

// Spinner
export {
  Spinner,
  SpinnerDots,
  SpinnerPulse,
  LoadingOverlay,
} from "./components/spinner/Spinner";
export type { SpinnerProps } from "./components/spinner/Spinner";

// Sidebar
export {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarItem,
  SidebarCollapseButton,
  SidebarMobileTrigger,
  useSidebar,
} from "./components/sidebar/Sidebar";
export type { SidebarProps, SidebarItemProps, SidebarProviderProps } from "./components/sidebar/Sidebar";

// Popover
export {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverAnchor,
} from "./components/popover/Popover";

// Command
export { Command, useCommandPalette } from "./components/command/Command";
export type { CommandItem, CommandProps } from "./components/command/Command";

// Textarea
export { Textarea } from "./components/textarea/Textarea";
export type { TextareaProps } from "./components/textarea/Textarea";

// Separator
export { Separator } from "./components/separator/Separator";
export type { SeparatorProps } from "./components/separator/Separator";

// ScrollArea
export { ScrollArea, ScrollBar } from "./components/scroll-area/ScrollArea";

// NavigationMenu
export {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuContent,
  NavigationMenuTrigger,
  NavigationMenuLink,
  NavigationMenuIndicator,
  NavigationMenuViewport,
  navigationMenuTriggerStyle,
} from "./components/navigation/NavigationMenu";
