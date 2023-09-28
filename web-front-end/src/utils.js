export function scrollToElement(elementId) {
  const element = document.getElementById(elementId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
}
  
export function navigateTo(relativeUrl) {
  window.location.href = relativeUrl;
}