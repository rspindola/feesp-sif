<template>
  <div class="tooltip">
    <button>
      <svg
        width="15"
        height="10"
        viewBox="0 0 15 10"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M7.33333 0C4 0 1.15333 2.07333 0 5C1.15333 7.92667 4 10 7.33333 10C10.6667 10 13.5133 7.92667 14.6667 5C13.5133 2.07333 10.6667 0 7.33333 0ZM7.33333 8.33333C5.49333 8.33333 4 6.84 4 5C4 3.16 5.49333 1.66667 7.33333 1.66667C9.17333 1.66667 10.6667 3.16 10.6667 5C10.6667 6.84 9.17333 8.33333 7.33333 8.33333ZM5.33333 5C5.33333 3.89333 6.22667 3 7.33333 3C8.44 3 9.33333 3.89333 9.33333 5C9.33333 6.10667 8.44 7 7.33333 7C6.22667 7 5.33333 6.10667 5.33333 5Z"
          fill="#2867A1"
        />
      </svg>
    </button>
    <span class="tooltiptext">Exibir</span>
  </div>
</template>

<script>
export default {
  name: 'ViewButton',
}
</script>
