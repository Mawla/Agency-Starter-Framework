interface ValidateProps {
  length?: number;
  max?: number;
  maxWarning?: string | number;
  min?: number;
  minWarning?: string | number;
  required?: boolean;
  unique?: boolean;
}

export function validate({
  length,
  max,
  maxWarning,
  min,
  minWarning,
  required,
  unique,
}: ValidateProps) {
  return (Rule: any) => {
    const rules = [];
    isDefined(required) && rules.push(Rule.required().error());
    isDefined(min) && rules.push(Rule.min(min).error());
    isDefined(max) && rules.push(Rule.max(max).error());
    isDefined(length) && rules.push(Rule.length(length).error());
    isDefined(unique) && rules.push(Rule.unique().error());
    isDefined(minWarning) && rules.push(Rule.min(minWarning).warning());
    isDefined(maxWarning) && rules.push(Rule.max(maxWarning).warning());
    return rules;
  };

  function isDefined(field: string) {
    return typeof field !== "undefined"; // To prevent it being false on false or null
  }
}
