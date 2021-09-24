<script setup>
import { defineProps } from 'vue'

const props = defineProps(['icon', 'class'])
</script>

<template>
<div v-if="icon === 'arrow-right'">
    <svg :class="class" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
    </svg>
</div>

<div v-if="icon === 'arrow-left'">
    <svg xmlns="http://www.w3.org/2000/svg" :class="class" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
    </svg>
</div>

<div v-if="icon === 'user-circle'">
    <svg :class="class" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
</div>

<div v-if="icon === 'user'">
    <svg :class="class" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
</div>

<div v-if="icon === 'logout'">
    <svg :class="class" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
    </svg>
</div>

<div v-if="icon === 'exclamation-circle'">
    <svg :class="class" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
</div>

<div v-if="icon === 'collection'">
    <svg :class="class" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
    </svg>
</div>

<div v-if="icon === 'newspaper'">
    <svg :class="class" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
    </svg>
</div>

<div v-if="icon === 'home'">
    <svg :class="class" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
</div>

<div v-if="icon === 'bold'">
    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" :class="class" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><g fill="none"><path d="M6 4h6.5a4.5 4.5 0 0 1 3.256 7.606A4.5 4.5 0 0 1 13.5 20H6v-2h1V6H6V4zm3 7h3.5a2.5 2.5 0 0 0 0-5H9v5zm0 2v5h4.5a2.5 2.5 0 0 0 0-5H9z" fill="currentColor"/></g></svg>
</div>

<div v-if="icon === 'italic'">
    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" :class="class" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><g fill="none"><path d="M13 20H7v-2h1.927l4.116-12H11V4h6v2h-1.927l-4.116 12H13v2z" fill="currentColor"/></g></svg>
</div>

<div v-if="icon === 'strike'">
    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" :class="class" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><g fill="none"><path d="M12.25 19.26c-1.347 0-2.494-.307-3.44-.92a4.85 4.85 0 0 1-1.96-2.52l1.98-1.16c.56 1.573 1.72 2.36 3.48 2.36c.866 0 1.513-.167 1.94-.5c.44-.347.66-.793.66-1.34c0-.5-.178-.893-.532-1.18H4v-2h16v2h-2.928c.092.34.137.72.137 1.14c0 1.267-.46 2.273-1.38 3.02c-.906.733-2.1 1.1-3.58 1.1z" fill="currentColor"/><path d="M7.77 10.42c.1.208.224.401.37.58h4.714a53.725 53.725 0 0 0-.304-.1c-1.067-.333-1.807-.647-2.22-.94c-.4-.307-.6-.72-.6-1.24c0-.533.2-.953.6-1.26c.4-.32.933-.48 1.6-.48c1.373 0 2.353.653 2.94 1.96l1.94-1.12c-.454-.96-1.1-1.713-1.94-2.26c-.84-.547-1.82-.82-2.94-.82c-1.24 0-2.3.367-3.18 1.1c-.88.72-1.32 1.7-1.32 2.94c0 .627.113 1.173.34 1.64z" fill="currentColor"/></g></svg>
</div>

<div v-if="icon === 'underline'">
    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" :class="class" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><g fill="none"><path d="M9 4H7v7a5 5 0 0 0 10 0V4h-2v7a3 3 0 1 1-6 0V4z" fill="currentColor"/><path d="M19 20v-2H5v2h14z" fill="currentColor"/></g></svg>
</div>

<div v-if="icon === 'code'">
    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" :class="class" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><g fill="none"><path d="M8.01 18.02L2 12.01L8.01 6l1.415 1.414l-4.6 4.6l4.6 4.6l-1.414 1.406H8.01zm7.979 0l-1.413-1.413l4.6-4.6l-4.6-4.6L15.99 6L22 12.01l-6.01 6.01h-.001z" fill="currentColor"/></g></svg>
</div>

<div v-if="icon === 'paragraph'">
    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" :class="class" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><g fill="none"><path d="M6 9a5 5 0 0 1 5-5h7v2h-1v14h-2V6h-2v14h-2v-6a5 5 0 0 1-5-5zm5 3V6a3 3 0 0 0 0 6z" fill="currentColor"/></g></svg>
</div>

<div v-if="icon === 'h1'">
    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" :class="class" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><g fill="none"><path d="M10 4v7H4V4H2v16h2v-7h6v7h2V4h-2z" fill="currentColor"/><path d="M20 20V8h-1.5l-2.5.67v2.07l2-.536V20h2z" fill="currentColor"/></g></svg>
</div>

<div v-if="icon === 'h2'">
    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" :class="class" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><g fill="none"><path d="M10 4v7H4V4H2v16h2v-7h6v7h2V4h-2z" fill="currentColor"/><path d="M22 11.75C22 9.679 20.21 8 18 8s-4 1.679-4 3.75h2.133l.007-.144C16.218 10.707 17.02 10 18 10c1.03 0 1.867.784 1.867 1.75c0 .439-.173.841-.459 1.148L14 18.444V20h8v-2h-4.497l3.516-3.79l.158-.18A3.59 3.59 0 0 0 22 11.75z" fill="currentColor"/></g></svg>
</div>

<div v-if="icon === 'h3'">
    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" :class="class" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><g fill="none"><path d="M10 4v7H4V4H2v16h2v-7h6v7h2V4h-2z" fill="currentColor"/><path d="M21.729 10l.002-2H14.5v2h4.378l-3.176 3.283l1.407 1.515c.256-.118.546-.186.854-.186c1.04 0 1.884.768 1.884 1.714c0 .947-.844 1.715-1.884 1.715c-.917 0-1.681-.597-1.849-1.386L14 17.029C14.36 18.722 15.998 20 17.963 20C20.193 20 22 18.355 22 16.326c0-1.691-1.256-3.117-2.968-3.543L21.73 10z" fill="currentColor"/></g></svg>
</div>

<div v-if="icon === 'list-ul'">
    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" :class="class" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><g fill="none"><path d="M20 18H8v-2h12v2zM6 18H4v-2h2v2zm14-5H8v-2h12v2zM6 13H4v-2h2v2zm14-5H8.023V6H20v2zM6 8H4V6h2v2z" fill="currentColor"/></g></svg>
</div>

<div v-if="icon === 'list-ol'">
    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" :class="class" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><g fill="none"><path d="M6.983 19H4v-1h1.989v-.5h-.994v-1h.995V16H4v-1h2.983v4zM21 18H9.069v-2H21v2zM6.983 14H4v-.9L5.79 11H4v-1h2.983v.9L5.193 13h1.79v1zM21 13H9.069v-2H21v2zM6.486 9h-.995V6H4.5V5h1.986v4zM21 8H9.069V6H21v2z" fill="currentColor"/></g></svg>
</div>

<div v-if="icon === 'terminal'">
    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" :class="class" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><g fill="none"><path d="M20 20H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2zM4 6v12h16V6H4zm14 10h-6v-2h6v2zM7.414 16L6 14.586l2.293-2.293L6 10l1.414-1.414l3.707 3.707L7.415 16h-.001z" fill="currentColor"/></g></svg>
</div>

<div v-if="icon === 'blockquote'">
    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" :class="class" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><g fill="none"><path d="M7.627 11.379C6.06 11.379 5 10.287 5 8.669C5 7.213 6.216 6 7.863 6C9.667 6 11 7.456 11 9.68c0 5.055-3.686 7.077-6 7.32v-2.224c1.569-.283 3.333-1.86 3.412-3.6c-.079.04-.392.203-.785.203z" fill="currentColor"/><path d="M15.627 11.379c-1.568 0-2.627-1.092-2.627-2.71C13 7.213 14.216 6 15.863 6C17.667 6 19 7.456 19 9.68c0 5.055-3.686 7.077-6 7.32v-2.224c1.569-.283 3.333-1.86 3.412-3.6c-.079.04-.392.203-.785.203z" fill="currentColor"/></g></svg>
</div>

<div v-if="icon === 'minus'">
    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" :class="class" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><g fill="none"><path d="M5 13v-2h14v2H5z" fill="currentColor"/></g></svg>
</div>

<div v-if="icon === 'line-break'">
    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" :class="class" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><g fill="none"><path d="M18 6v6H7.83l2.58-2.59L9 8l-5 5l5 5l1.41-1.41L7.83 14H20V6h-2z" fill="currentColor"/></g></svg>
</div>

<div v-if="icon === 'undo'">
    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" :class="class" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><g fill="none"><path d="M6 4h2v2.557a7 7 0 1 1-1.037 10.011l1.62-1.184A5 5 0 1 0 9.408 8H12v2H6V4z" fill="currentColor"/></g></svg>
</div>

<div v-if="icon === 'redo'">
    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" :class="class" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><g fill="none"><path d="M18.001 4h-2v2.557a7 7 0 1 0 1.037 10.011l-1.62-1.184A5 5 0 1 1 14.593 8h-2.59v2h6V4z" fill="currentColor"/></g></svg>
</div>

<div v-if="icon === 'plus'">
    <svg xmlns="http://www.w3.org/2000/svg" :class="class" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
    </svg>
</div>

<div v-if="icon === 'save'">
    <svg xmlns="http://www.w3.org/2000/svg" :class="class" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
    </svg>
</div>

<div v-if="icon === 'selector'">
    <svg xmlns="http://www.w3.org/2000/svg" :class="class" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
    </svg>
</div>

<div v-if="icon === 'check'">
    <svg xmlns="http://www.w3.org/2000/svg" :class="class" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
    </svg>
</div>

<div v-if="icon === 'clipboard-list'">
    <svg xmlns="http://www.w3.org/2000/svg" :class="class" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
    </svg>
</div>

<div v-if="icon === 'search'">
    <svg xmlns="http://www.w3.org/2000/svg" :class="class" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
</div>

<div v-if="icon === 'phone'">
    <svg xmlns="http://www.w3.org/2000/svg" :class="class" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    </svg>
</div>

<div v-if="icon === 'at-symbol'">
    <svg xmlns="http://www.w3.org/2000/svg" :class="class" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
    </svg>
</div>

<div v-if="icon === 'location-marker'">
    <svg xmlns="http://www.w3.org/2000/svg" :class="class" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
</div>

<div v-if="icon === 'pencil'">
    <svg xmlns="http://www.w3.org/2000/svg" :class="class" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
    </svg>
</div>

<div v-if="icon === 'eye'">
    <svg xmlns="http://www.w3.org/2000/svg" :class="class" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>
</div>

<div v-if="icon === 'download'">
    <svg xmlns="http://www.w3.org/2000/svg" :class="class" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
    </svg>
</div>

<div v-if="icon === 'paper-clip'">
    <svg xmlns="http://www.w3.org/2000/svg" :class="class" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
    </svg>
</div>

<div v-if="icon === 'calendar'">
    <svg xmlns="http://www.w3.org/2000/svg" :class="class" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
</div>

<div v-if="icon === 'excel'">
    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" :class="class" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path d="M5 3c-1.11 0-2 .89-2 2v14c0 1.11.89 2 2 2h14c1.11 0 2-.89 2-2V5c0-1.11-.89-2-2-2H5m0 2h14v14H5V5m8 7l3.2 5h-2L12 13.2L9.8 17h-2l3.2-5l-3.2-5h2l2.2 3.8L14.2 7h2L13 12z" fill="currentColor"/></svg>
</div>

<div v-if="icon === 'loader'">
    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" :class="class" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></g></svg>
</div>

<div v-if="icon === 'zoom'">
    <svg :class="class" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><g fill="none"><path d="M0 8a8 8 0 0 1 8-8h8a8 8 0 0 1 8 8v8a8 8 0 0 1-8 8H8a8 8 0 0 1-8-8V8z" fill="#3984FD"/><path d="M5 9a1 1 0 0 1 1-1h6a3 3 0 0 1 3 3v4a1 1 0 0 1-1 1H8a3 3 0 0 1-3-3V9z" fill="#fff"/><path d="M15.5 11.752a2 2 0 0 1 .495-1.318l1.69-1.932c.457-.52 1.315-.198 1.315.494v6.008c0 .693-.858 1.015-1.314.494l-1.691-1.932a2 2 0 0 1-.495-1.317v-.498z" fill="#fff"/></g></svg>
</div>

<div v-if="icon === 'youtube'">
    <svg :class="class" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" preserveAspectRatio="xMidYMid meet" viewBox="0 0 256 180"><path d="M250.346 28.075A32.18 32.18 0 0 0 227.69 5.418C207.824 0 127.87 0 127.87 0S47.912.164 28.046 5.582A32.18 32.18 0 0 0 5.39 28.24c-6.009 35.298-8.34 89.084.165 122.97a32.18 32.18 0 0 0 22.656 22.657c19.866 5.418 99.822 5.418 99.822 5.418s79.955 0 99.82-5.418a32.18 32.18 0 0 0 22.657-22.657c6.338-35.348 8.291-89.1-.164-123.134z" fill="red"/><path fill="#FFF" d="M102.42 128.06l66.329-38.418l-66.328-38.418z"/></svg>
</div>
</template>
