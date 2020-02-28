export default function getSecurityCredentialsForEndpoint(endpoint) {
  const { security } = endpoint.subPathDetails;
  if (!security) {
    return [];
  }
  // Format is weird so had to do this to get which credentials should be used
  let credentialsToUse = [];
  security.forEach(function _(item) {
    credentialsToUse = credentialsToUse.concat(Object.keys(item));
  });
  return credentialsToUse;
}
