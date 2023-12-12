import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const formatCurrency = (amount) => {
  let [lowerSalary, upperSalary] = amount?.split('-');
  let formattedLowerSalary = `Rp.${lowerSalary}`;
  let formattedUpperSalary = `Rp.${upperSalary}`;

  return `${formattedLowerSalary} - ${formattedUpperSalary}`;
}

export const formatSalary = (amount) => {
  let upperRange = amount?.split('-')[1];

  let upperSalary = parseInt(upperRange?.replace(/\./g, ''), 10);
  return `IDR ${upperSalary / 1000000}jt/month`;
}

export const getInitials = (fullName) => {
  const nameParts = fullName?.trim().split(/\s+/);
  if (nameParts?.length > 2) {
    return nameParts[0][0].toUpperCase() + nameParts[nameParts.length - 1][0].toUpperCase();
  } else {
    return nameParts?.map(name => name[0].toUpperCase()).join('');
  }
}

export const exclude = (user, keys) => {
  return Object.fromEntries(
    Object.entries(user).filter(([key]) => !keys.includes(key))
  );
}

export const textManipulation = (text, type) => {
  switch (type) {
    case 'capitalize':
      return text
      .toLowerCase()                   // Convert the entire string to lowercase
      .split('_')                      // Split the string into an array of words
      .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize the first letter of each word
      .join(' ');
    case 'kebab':
      return text.replace(/\s+/g, '-').toLowerCase();
    case 'snake':
      return text.replace(/\s+/g, '_').toLowerCase();
    case 'camel':
      return text.replace(/\s+(.)/g, function(match, group1) {
        return group1.toUpperCase();
      });
    case 'pascal':
      return text.replace(/\w+/g, function(w) {
        return w[0].toUpperCase() + w.slice(1).toLowerCase();
      });
    default:
      return text;
  }
}

export const camelCaseToTitle = (camelCase) => {
  // Add a space before each uppercase letter (except for the first character)
  let result = camelCase.replace(/([A-Z])/g, ' $1');

  // Capitalize the first letter of the result
  return result.charAt(0).toUpperCase() + result.slice(1);
}

export const getAppliedJobsData = (appliedJobs, dateArray) => {
  return dateArray.map(day => {
    return appliedJobs.filter(job => {
      const jobDate = new Date(job.createdAt);
      const formattedJobDate = jobDate.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
      return formattedJobDate === day;
    }).length;
  });
};

export const getDatesForPeriod = (period) => {
  const endDate = new Date();
  const startDate = new Date();

  switch (period) {
    case '7days':
      startDate.setDate(endDate.getDate() - 6);
      break;
    case '1month':
      startDate.setMonth(endDate.getMonth() - 1);
      break;
    case '6months':
      startDate.setMonth(endDate.getMonth() - 6);
      break;
    case '1year':
      startDate.setFullYear(endDate.getFullYear() - 1);
      break;
    default:
      startDate.setDate(endDate.getDate() - 6);
  }

  const dates = [];
  while (startDate <= endDate) {
    dates.push(startDate.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }));
    startDate.setDate(startDate.getDate() + 1);
  }

  return dates;
};

export const formatNumber = (num) => {
  if (num >= 1000) {
    return (num / 1000).toFixed(num % 1000 !== 0 ? 1 : 0) + 'k';
  }
  return num.toString();
};
