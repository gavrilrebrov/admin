<script>
export default {
  props: ['icon', 'class']
}
</script>

<template>
<svg v-if="icon === 'exclamation-circle'" :class="class" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>

<svg v-if="icon === 'check-circle'" :class="class" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>

<svg v-if="icon === 'user-circle'" :class="class" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>

<svg v-if="icon === 'logout'" :class="class" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>

<svg v-if="icon === 'plus'" :class="class" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>

<svg v-if="icon === 'pencil'" :class="class" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>

<svg v-if="icon === 'trash'" :class="class" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>

<svg v-if="icon === 'chevron-down'" :class="class" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>

<svg v-if="icon === 'photograph'" :class="class" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>

<svg v-if="icon === 'search-circle'" :class="class" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16l2.879-2.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242zM21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>

<svg v-if="icon === 'office-building'" :class="class" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>

<svg v-if="icon === 'newspaper'" :class="class" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"></path></svg>

<svg v-if="icon === 'users'" :class="class" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>

<svg v-if="icon === 'x'" :class="class" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>

<svg v-if="icon === 'loader'" :class="class" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></g></svg>




<svg v-if="icon === 'bx:category'" :class="class" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="currentColor" d="M10 3H4a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1zM9 9H5V5h4v4zm11-6h-6a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1zm-1 6h-4V5h4v4zm-9 4H4a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-6a1 1 0 0 0-1-1zm-1 6H5v-4h4v4zm8-6c-2.206 0-4 1.794-4 4s1.794 4 4 4s4-1.794 4-4s-1.794-4-4-4zm0 6c-1.103 0-2-.897-2-2s.897-2 2-2s2 .897 2 2s-.897 2-2 2z"/></svg>

<svg v-if="icon === 'bx:chalkboard'" :class="class" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="currentColor" d="M20 3H4c-1.103 0-2 .897-2 2v11c0 1.103.897 2 2 2h4l-1.8 2.4l1.6 1.2l2.7-3.6h3l2.7 3.6l1.6-1.2L16 18h4c1.103 0 2-.897 2-2V5c0-1.103-.897-2-2-2zM4 16V5h16l.001 11H4z"/><path fill="currentColor" d="M6 12h4v2H6z"/></svg>





<svg v-if="icon === 'material-symbols:engineering-outline-rounded'" :class="class" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="currentColor" d="M19.275 10q-.2 0-.325-.113q-.125-.112-.175-.287l-.125-.65q-.225-.075-.412-.188q-.188-.112-.338-.262l-.675.225q-.175.05-.325-.013q-.15-.062-.25-.212l-.3-.5q-.1-.15-.075-.325q.025-.175.175-.3L17 6.9q-.05-.125-.05-.2v-.4q0-.075.05-.2l-.55-.475q-.15-.125-.175-.3q-.025-.175.075-.325l.3-.5q.1-.15.25-.213q.15-.062.325-.012l.675.225q.15-.15.338-.263q.187-.112.412-.187l.125-.65q.05-.175.175-.288q.125-.112.325-.112h.55q.2 0 .325.112q.125.113.175.288l.125.65q.225.075.413.187q.187.113.337.263l.675-.225q.175-.05.325.012q.15.063.25.213l.3.5q.1.15.075.325q-.025.175-.175.3l-.55.475q.05.125.05.2v.4q0 .075-.05.2l.55.475q.15.125.175.3q.025.175-.075.325l-.3.5q-.1.15-.25.212q-.15.063-.325.013L21.2 8.5q-.15.15-.337.262q-.188.113-.413.188l-.125.65q-.05.175-.175.287q-.125.113-.325.113Zm.275-2.25q.525 0 .888-.363q.362-.362.362-.887t-.362-.888q-.363-.362-.888-.362t-.887.362q-.363.363-.363.888t.363.887q.362.363.887.363ZM16.75 15q-.05 0-.25-.2l-.1-.55q-.15-.05-.287-.113q-.138-.062-.263-.187l-.5.175l-.3-.1l-.3-.55q-.025-.025.05-.3l.4-.375v-.6l-.4-.375q-.025-.025-.05-.3l.3-.55l.3-.1l.5.175q.1-.1.25-.175q.15-.075.3-.125l.1-.55q0-.05.25-.2h.6q.05 0 .25.2l.1.55q.15.05.3.125t.25.175l.5-.175l.3.1l.3.55q.025.025-.05.3l-.4.375v.6l.4.375q.025.025.05.3l-.3.55l-.3.1l-.5-.175q-.125.125-.262.187q-.138.063-.288.113l-.1.55q0 .05-.25.2Zm.3-1.75q.3 0 .525-.225q.225-.225.225-.525q0-.3-.225-.525q-.225-.225-.525-.225q-.3 0-.525.225q-.225.225-.225.525q0 .3.225.525q.225.225.525.225Zm-8-.25q-1.65 0-2.825-1.175Q5.05 10.65 5.05 9H4.8q-.225 0-.362-.137Q4.3 8.725 4.3 8.5q0-.225.138-.363Q4.575 8 4.8 8h.25q0-1.125.55-2.025q.55-.9 1.45-1.425v.95q0 .225.138.362Q7.325 6 7.55 6q.225 0 .363-.138q.137-.137.137-.362V4.15q.225-.075.475-.113Q8.775 4 9.05 4t.525.037q.25.038.475.113V5.5q0 .225.138.362q.137.138.362.138q.225 0 .363-.138q.137-.137.137-.362v-.95q.9.525 1.45 1.425q.55.9.55 2.025h.25q.225 0 .363.137q.137.138.137.363q0 .225-.137.363Q13.525 9 13.3 9h-.25q0 1.65-1.175 2.825Q10.7 13 9.05 13Zm0-2q.825 0 1.413-.588q.587-.587.587-1.412h-4q0 .825.588 1.412Q8.225 11 9.05 11Zm-8 10v-2.8q0-.825.425-1.55q.425-.725 1.175-1.1q1.275-.65 2.875-1.1Q7.125 14 9.05 14q1.925 0 3.525.45q1.6.45 2.875 1.1q.75.375 1.175 1.1q.425.725.425 1.55V21Zm2-2h12v-.8q0-.275-.137-.5q-.138-.225-.363-.35q-.9-.45-2.312-.9Q10.825 16 9.05 16q-1.775 0-3.187.45q-1.413.45-2.313.9q-.225.125-.362.35q-.138.225-.138.5Zm6 0Z"/></svg>





<svg v-if="icon === 'majesticons:map-marker-area-line'" :class="class" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M18 16.016c1.245.529 2 1.223 2 1.984c0 1.657-3.582 3-8 3s-8-1.343-8-3c0-.76.755-1.456 2-1.984"/><path d="M17 8.444C17 11.537 12 17 12 17s-5-5.463-5-8.556C7 5.352 9.239 3 12 3s5 2.352 5 5.444z"/><circle cx="12" cy="8" r="1"/></g></svg>




<svg v-if="icon === 'bold'" :class="class" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><g fill="none"><path d="M6 4h6.5a4.5 4.5 0 0 1 3.256 7.606A4.5 4.5 0 0 1 13.5 20H6v-2h1V6H6V4zm3 7h3.5a2.5 2.5 0 0 0 0-5H9v5zm0 2v5h4.5a2.5 2.5 0 0 0 0-5H9z" fill="currentColor"/></g></svg>

<svg v-if="icon === 'italic'" :class="class" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><g fill="none"><path d="M13 20H7v-2h1.927l4.116-12H11V4h6v2h-1.927l-4.116 12H13v2z" fill="currentColor"/></g></svg>

<svg v-if="icon === 'strike'" :class="class" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><g fill="none"><path d="M12.25 19.26c-1.347 0-2.494-.307-3.44-.92a4.85 4.85 0 0 1-1.96-2.52l1.98-1.16c.56 1.573 1.72 2.36 3.48 2.36c.866 0 1.513-.167 1.94-.5c.44-.347.66-.793.66-1.34c0-.5-.178-.893-.532-1.18H4v-2h16v2h-2.928c.092.34.137.72.137 1.14c0 1.267-.46 2.273-1.38 3.02c-.906.733-2.1 1.1-3.58 1.1z" fill="currentColor"/><path d="M7.77 10.42c.1.208.224.401.37.58h4.714a53.725 53.725 0 0 0-.304-.1c-1.067-.333-1.807-.647-2.22-.94c-.4-.307-.6-.72-.6-1.24c0-.533.2-.953.6-1.26c.4-.32.933-.48 1.6-.48c1.373 0 2.353.653 2.94 1.96l1.94-1.12c-.454-.96-1.1-1.713-1.94-2.26c-.84-.547-1.82-.82-2.94-.82c-1.24 0-2.3.367-3.18 1.1c-.88.72-1.32 1.7-1.32 2.94c0 .627.113 1.173.34 1.64z" fill="currentColor"/></g></svg>

<svg v-if="icon === 'code'" :class="class" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><g fill="none"><path d="M8.01 18.02L2 12.01L8.01 6l1.415 1.414l-4.6 4.6l4.6 4.6l-1.414 1.406H8.01zm7.979 0l-1.413-1.413l4.6-4.6l-4.6-4.6L15.99 6L22 12.01l-6.01 6.01h-.001z" fill="currentColor"/></g></svg>

<svg v-if="icon === 'paragraph'" :class="class" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><g fill="none"><path d="M6 9a5 5 0 0 1 5-5h7v2h-1v14h-2V6h-2v14h-2v-6a5 5 0 0 1-5-5zm5 3V6a3 3 0 0 0 0 6z" fill="currentColor"/></g></svg>

<svg v-if="icon === 'h1'" :class="class" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img"  preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><g fill="none"><path d="M10 4v7H4V4H2v16h2v-7h6v7h2V4h-2z" fill="currentColor"/><path d="M20 20V8h-1.5l-2.5.67v2.07l2-.536V20h2z" fill="currentColor"/></g></svg>

<svg v-if="icon === 'h2'" :class="class" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><g fill="none"><path d="M10 4v7H4V4H2v16h2v-7h6v7h2V4h-2z" fill="currentColor"/><path d="M22 11.75C22 9.679 20.21 8 18 8s-4 1.679-4 3.75h2.133l.007-.144C16.218 10.707 17.02 10 18 10c1.03 0 1.867.784 1.867 1.75c0 .439-.173.841-.459 1.148L14 18.444V20h8v-2h-4.497l3.516-3.79l.158-.18A3.59 3.59 0 0 0 22 11.75z" fill="currentColor"/></g></svg>

<svg v-if="icon === 'h3'" :class="class" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><g fill="none"><path d="M10 4v7H4V4H2v16h2v-7h6v7h2V4h-2z" fill="currentColor"/><path d="M21.729 10l.002-2H14.5v2h4.378l-3.176 3.283l1.407 1.515c.256-.118.546-.186.854-.186c1.04 0 1.884.768 1.884 1.714c0 .947-.844 1.715-1.884 1.715c-.917 0-1.681-.597-1.849-1.386L14 17.029C14.36 18.722 15.998 20 17.963 20C20.193 20 22 18.355 22 16.326c0-1.691-1.256-3.117-2.968-3.543L21.73 10z" fill="currentColor"/></g></svg>

<svg v-if="icon === 'terminal'" :class="class" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><g fill="none"><path d="M20 20H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2zM4 6v12h16V6H4zm14 10h-6v-2h6v2zM7.414 16L6 14.586l2.293-2.293L6 10l1.414-1.414l3.707 3.707L7.415 16h-.001z" fill="currentColor"/></g></svg>

<svg v-if="icon === 'list-ul'" :class="class" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><g fill="none"><path d="M20 18H8v-2h12v2zM6 18H4v-2h2v2zm14-5H8v-2h12v2zM6 13H4v-2h2v2zm14-5H8.023V6H20v2zM6 8H4V6h2v2z" fill="currentColor"/></g></svg>

<svg v-if="icon === 'list-ol'" :class="class" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><g fill="none"><path d="M6.983 19H4v-1h1.989v-.5h-.994v-1h.995V16H4v-1h2.983v4zM21 18H9.069v-2H21v2zM6.983 14H4v-.9L5.79 11H4v-1h2.983v.9L5.193 13h1.79v1zM21 13H9.069v-2H21v2zM6.486 9h-.995V6H4.5V5h1.986v4zM21 8H9.069V6H21v2z" fill="currentColor"/></g></svg>

<svg v-if="icon === 'blockquote'" :class="class" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><g fill="none"><path d="M7.627 11.379C6.06 11.379 5 10.287 5 8.669C5 7.213 6.216 6 7.863 6C9.667 6 11 7.456 11 9.68c0 5.055-3.686 7.077-6 7.32v-2.224c1.569-.283 3.333-1.86 3.412-3.6c-.079.04-.392.203-.785.203z" fill="currentColor"/><path d="M15.627 11.379c-1.568 0-2.627-1.092-2.627-2.71C13 7.213 14.216 6 15.863 6C17.667 6 19 7.456 19 9.68c0 5.055-3.686 7.077-6 7.32v-2.224c1.569-.283 3.333-1.86 3.412-3.6c-.079.04-.392.203-.785.203z" fill="currentColor"/></g></svg>

<svg v-if="icon === 'minus'" :class="class" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><g fill="none"><path d="M5 13v-2h14v2H5z" fill="currentColor"/></g></svg>

<svg v-if="icon === 'line-break'" :class="class" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><g fill="none"><path d="M18 6v6H7.83l2.58-2.59L9 8l-5 5l5 5l1.41-1.41L7.83 14H20V6h-2z" fill="currentColor"/></g></svg>

<svg v-if="icon === 'undo'" :class="class" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><g fill="none"><path d="M6 4h2v2.557a7 7 0 1 1-1.037 10.011l1.62-1.184A5 5 0 1 0 9.408 8H12v2H6V4z" fill="currentColor"/></g></svg>

<svg v-if="icon === 'redo'" :class="class" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><g fill="none"><path d="M18.001 4h-2v2.557a7 7 0 1 0 1.037 10.011l-1.62-1.184A5 5 0 1 1 14.593 8h-2.59v2h6V4z" fill="currentColor"/></g></svg>

<svg v-if="icon === 'table'" :class="class" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><g fill="none"><path d="M13 10v4h6v-4h-6zm-2 0H5v4h6v-4zm2 9h6v-3h-6v3zm-2 0v-3H5v3h6zm2-14v3h6V5h-6zm-2 0H5v3h6V5zm8-2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14z" fill="currentColor"/></g></svg>

<svg v-if="icon === 'add-table'" :class="class" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><g fill="none"><path d="M13 10v11H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v5h-8zm-2 0H5v4h6v-4zm0 9v-3H5v3h6zm2-14v3h6V5h-6zm-2 0H5v3h6V5z" fill="currentColor"/><path d="M19 21v-3h-3v-2h3v-3h2v3h3v2h-3v3h-2z" fill="currentColor"/></g></svg>

<svg v-if="icon === 'delete-table'" :class="class" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><g fill="none"><path d="M19 10h-6v11H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v8h-2v-3zm-8 0H5v4h6v-4zm0 9v-3H5v3h6zm2-14v3h6V5h-6zm-2 0H5v3h6V5z" fill="currentColor"/><path d="M16 18v-2h8v2h-8z" fill="currentColor"/></g></svg>

<svg v-if="icon === 'add-col'" :class="class" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><g fill="none"><path d="M14 4v8.101a7.018 7.018 0 0 0-2-1.427V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2h-4c-.033 0-.066 0-.099-.002A7.017 7.017 0 0 0 15.326 20H18V4h-4z" fill="currentColor"/><path d="M14 17a5 5 0 1 1-10 0a5 5 0 0 1 10 0zm-4 3v-2h2v-2h-2v-2H8v2H6v2h2v2h2z" fill="currentColor"/></g></svg>

<svg v-if="icon === 'add-row'" :class="class" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><g fill="none"><path d="M7 14A5 5 0 1 1 7 4a5 5 0 0 1 0 10zm-3-4h2v2h2v-2h2V8H8V6H6v2H4v2z" fill="currentColor"/><path d="M20 14h-8.101a7.018 7.018 0 0 0 1.427-2H20a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-4c0-.033 0-.066.002-.099A7.018 7.018 0 0 0 4 15.326V18h16v-4z" fill="currentColor"/></g></svg>

<svg v-if="icon === 'delete-col'" :class="class" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><g fill="none"><path d="M6 4v16h2.674c.355.749.84 1.424 1.425 1.998A2.015 2.015 0 0 1 10 22H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v6.674a7.018 7.018 0 0 0-2 1.427V4H6z" fill="currentColor"/><path d="M10 17c0-1.636.786-3.088 2-4a5 5 0 1 1-2 4zm2 1h6v-2h-6v2z" fill="currentColor"/></g></svg>

<svg v-if="icon === 'delete-row'" :class="class" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><g fill="none"><path d="M20 6H4v4h8.101a7.018 7.018 0 0 0-1.427 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v4c0 .033 0 .066-.002.099A7.017 7.017 0 0 0 20 8.674V6z" fill="currentColor"/><path d="M20.85 11.81A4.99 4.99 0 0 0 17 10a4.993 4.993 0 0 0-4 2a5 5 0 1 0 7.851-.19zM20 14v2h-6v-2h6z" fill="currentColor"/></g></svg>



<svg v-if="icon === 'add-photo'" :class="class" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="currentColor" d="M19 8V6h-2V4h2V2h2v2h2v2h-2v2ZM3 22q-.825 0-1.412-.587Q1 20.825 1 20V8q0-.825.588-1.412Q2.175 6 3 6h3.15L8 4h6v2H8.875L7.05 8H3v12h16v-9h2v9q0 .825-.587 1.413Q19.825 22 19 22Zm8-3.5q1.875 0 3.188-1.312Q15.5 15.875 15.5 14q0-1.875-1.312-3.188Q12.875 9.5 11 9.5q-1.875 0-3.188 1.312Q6.5 12.125 6.5 14q0 1.875 1.312 3.188Q9.125 18.5 11 18.5Zm0-2q-1.05 0-1.775-.725Q8.5 15.05 8.5 14q0-1.05.725-1.775Q9.95 11.5 11 11.5q1.05 0 1.775.725q.725.725.725 1.775q0 1.05-.725 1.775q-.725.725-1.775.725Zm0-2.5Z"/></svg>
</template>