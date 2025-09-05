import React, { Fragment } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

/**
 * SVG Icons
 */
const ChevronRightIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 5l7 7-7 7"
    />
  </svg>
);

const HomeIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
    />
  </svg>
);

/**
 * Breadcrumb item type
 */
export interface BreadcrumbItem {
  /** The display text for the breadcrumb */
  label: string;
  /** Optional path for navigation (if not provided, item is not clickable) */
  path?: string;
  /** Whether this is the current/active breadcrumb */
  current?: boolean;
  /** Optional icon to display before the label */
  icon?: React.ReactNode;
}

/**
 * Props for the Breadcrumbs component
 */
export interface BreadcrumbsProps {
  /** Manually provided breadcrumb items */
  items?: BreadcrumbItem[];
  /** Whether to auto-generate breadcrumbs from current pathname */
  autoGenerate?: boolean;
  /** Whether to show home icon for the first item */
  showHomeIcon?: boolean;
  /** Custom separator between items */
  separator?: React.ReactNode;
  /** Label for the home breadcrumb */
  homeLabel?: string;
  /** Path for the home breadcrumb */
  homePath?: string;
  /** Optional callback when a breadcrumb is clicked */
  onBreadcrumbClick?: (item: BreadcrumbItem, e: React.MouseEvent) => void;
  /** Additional CSS class for the container */
  className?: string;
  /** Classes for breadcrumb items */
  itemClassName?: {
    /** Base class for all items */
    base?: string;
    /** Class for the active/current item */
    active?: string;
    /** Class for inactive/non-current items */
    inactive?: string;
  };
  /** Class for separator elements */
  separatorClassName?: string;
  /** Custom path segment to label mapping */
  pathLabels?: Record<string, string>;
}

/**
 * Props for the BreadcrumbItem component
 */
interface BreadcrumbItemProps {
  item: BreadcrumbItem;
  isFirst: boolean;
  showHomeIcon: boolean;
  onBreadcrumbClick?: (item: BreadcrumbItem, e: React.MouseEvent) => void;
  isClickable: boolean;
}

/**
 * A versatile breadcrumbs component that supports manual items or auto-generation from Next.js pathname
 */
export const Breadcrumbs = ({
  items = [],
  autoGenerate = false,
  showHomeIcon = true,
  separator = <ChevronRightIcon className="h-4 w-4 flex-shrink-0" />,
  homeLabel = "Home",
  homePath = "/",
  onBreadcrumbClick,
  className = "",
  itemClassName = {
    base: "text-sm font-normal",
    active: "underline",
    inactive: "hover:text-white",
  },
  separatorClassName = "mx-2 flex-shrink-0",
  pathLabels = {},
}: BreadcrumbsProps) => {
  const pathname = usePathname();

  // Auto-generate breadcrumbs from pathname if requested
  const breadcrumbItems = autoGenerate
    ? generateBreadcrumbsFromPathname(pathname, homeLabel, homePath, pathLabels)
    : [...items]; // Create a copy to avoid mutating props

  // If no items and not auto-generating, don't render anything
  if (breadcrumbItems.length === 0) {
    return null;
  }

  // Ensure the last item is marked as current if not explicitly set
  if (breadcrumbItems.length > 0) {
    const lastIndex = breadcrumbItems.length - 1;
    if (breadcrumbItems[lastIndex].current === undefined) {
      breadcrumbItems[lastIndex] = {
        ...breadcrumbItems[lastIndex],
        current: true,
      };
    }
  }

  return (
    <nav className={`flex ${className}`} aria-label="Breadcrumbs">
      <ol className="flex items-center space-x-1">
        {breadcrumbItems.map((item, index) => {
          const isLast = index === breadcrumbItems.length - 1;
          const isCurrent = item.current === true;

          return (
            <Fragment key={index}>
              <li
                className={`flex items-center ${itemClassName.base || ""} ${
                  isCurrent
                    ? itemClassName.active || ""
                    : itemClassName.inactive || ""
                }`}
              >
                <BreadcrumbItem
                  item={item}
                  isFirst={index === 0}
                  showHomeIcon={showHomeIcon}
                  onBreadcrumbClick={onBreadcrumbClick}
                  isClickable={!!item.path && !isCurrent}
                />
              </li>

              {!isLast && (
                <li className={separatorClassName} aria-hidden="true">
                  {separator}
                </li>
              )}
            </Fragment>
          );
        })}
      </ol>
    </nav>
  );
};

/**
 * Individual breadcrumb item renderer
 */
const BreadcrumbItem: React.FC<BreadcrumbItemProps> = ({
  item,
  isFirst,
  showHomeIcon,
  onBreadcrumbClick,
  isClickable,
}) => {
  const { label, path, icon } = item;

  // Determine the content with optional home icon
  const content = (
    <span className="flex items-center">
      {isFirst && showHomeIcon && !icon ? (
        <HomeIcon className="mr-1 h-4 w-4 flex-shrink-0" />
      ) : icon ? (
        <span className="mr-1">{icon}</span>
      ) : null}
      {label}
    </span>
  );

  // Handle the click, calling the custom handler if provided
  const handleClick = (e: React.MouseEvent) => {
    if (onBreadcrumbClick) {
      onBreadcrumbClick(item, e);
    }
  };

  // Return either a link or a span based on whether the item is clickable
  if (isClickable && path) {
    return (
      <Link href={path} onClick={handleClick} className="hover:underline">
        {content}
      </Link>
    );
  }

  return (
    <span aria-current={item.current ? "page" : undefined}>{content}</span>
  );
};

/**
 * Helper function to generate breadcrumbs from Next.js pathname
 */
function generateBreadcrumbsFromPathname(
  pathname: string,
  homeLabel: string,
  homePath: string,
  pathLabels: Record<string, string> = {}
): BreadcrumbItem[] {
  // Get the current path segments
  const pathSegments = pathname.split("/").filter(Boolean);

  // Start with home
  const breadcrumbs: BreadcrumbItem[] = [{ label: homeLabel, path: homePath }];

  // Build up the breadcrumbs based on path segments
  let currentPath = "";
  pathSegments.forEach((segment: string, index: number) => {
    currentPath += `/${segment}`;

    // Use custom label if provided, otherwise format the segment
    const formattedLabel =
      pathLabels[segment] ||
      segment.replace(/-/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());

    breadcrumbs.push({
      label: formattedLabel,
      path: currentPath,
      current: index === pathSegments.length - 1,
    });
  });

  return breadcrumbs;
}

export default Breadcrumbs;
