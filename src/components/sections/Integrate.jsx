"use client";
import { useCallback, useEffect, useRef, useState } from "react";

/* ─────────────────────────────────────────────────────────────
   DATA
───────────────────────────────────────────────────────────── */
const LANGUAGES = [
  {
    id: "nodejs", label: "Node.js", accent: "#FFFF92",
    icon: <svg fill="currentColor" height="28" viewBox="0 0 24 24" width="28"><path d="M11.3962 19.8356C11.5815 19.9438 11.7914 20 12.0028 20L12.0022 19.9969C12.2164 19.9969 12.4263 19.9412 12.6116 19.8325L18.3934 16.4469C18.7669 16.2267 19 15.8173 19 15.3785V8.61295C19 8.17268 18.7669 7.76323 18.3934 7.54456L12.6116 4.1574C12.2483 3.94753 11.7619 3.94753 11.3956 4.1574L5.60656 7.54309C5.23162 7.76029 5 8.17121 5 8.61148V15.377C5 15.8158 5.23162 16.2267 5.60656 16.4469L7.12367 17.3333C7.85906 17.7002 8.12253 17.7002 8.45693 17.7002C9.5441 17.7002 10.1695 17.0324 10.1695 15.8701V9.18971C10.1695 9.09431 10.0942 9.02094 10.003 9.02094H9.2705C9.1764 9.02094 9.10258 9.09431 9.10258 9.18971V15.8672C9.10258 16.3838 8.57709 16.8974 7.7172 16.4615L6.13349 15.534C6.07848 15.5032 6.04374 15.4416 6.04374 15.377V8.61148C6.04374 8.54691 6.07935 8.4838 6.13537 8.45152L11.9152 5.07023C11.9687 5.03794 12.0397 5.03794 12.0932 5.07023L17.8742 8.45152C17.9289 8.48527 17.9636 8.54544 17.9636 8.61295V15.3785C17.9636 15.443 17.9289 15.5061 17.8753 15.537L12.0921 18.9212C12.0424 18.9505 11.9664 18.9505 11.9129 18.9212L10.4296 18.0289C10.3855 18.0025 10.329 17.9937 10.2859 18.0186C9.87546 18.2549 9.79744 18.2857 9.41295 18.4222C9.31784 18.4555 9.17713 18.5133 9.46549 18.6768L11.3962 19.8356Z" /><path d="M10.7281 13.1729C10.7281 14.1605 11.2587 15.3381 13.7891 15.3381L13.7807 15.345C15.6134 15.345 16.6644 14.6127 16.6644 13.3359C16.6644 12.0694 15.8204 11.7318 14.0427 11.4926C12.2477 11.2519 12.0653 11.1272 12.0653 10.7001C12.0653 10.3479 12.2202 9.8783 13.5506 9.8783C14.7391 9.8783 15.1762 10.1381 15.3572 10.9496C15.3731 11.0259 15.4412 11.0817 15.5193 11.0817H16.2706C16.317 11.0817 16.3618 11.0612 16.3937 11.0274C16.4255 10.9922 16.4429 10.9452 16.4386 10.8968C16.3228 9.49673 15.405 8.84512 13.5534 8.84512C11.9046 8.84512 10.9202 9.54956 10.9202 10.7324C10.9202 12.0166 11.8988 12.3702 13.4825 12.5287C15.376 12.7166 15.5237 12.9969 15.5237 13.3741C15.5237 14.0293 15.0054 14.3085 13.7865 14.3085C12.2564 14.3085 11.9205 13.9193 11.8076 13.1476C11.7946 13.065 11.7251 13.0041 11.6426 13.0041H10.8956C10.8028 13.0041 10.7281 13.0789 10.7281 13.1729Z" /></svg>,
    frameworks: ["Node.js", "Next.js", "Remix", "Nuxt", "Express", "Hono", "Redwood", "Bun", "Astro"],
    githubUrl: "https://github.com/resend/resend-node-example",
    zipUrl: "https://github.com/resend/resend-node-example/archive/refs/heads/main.zip",
  },
  {
    id: "serverless", label: "Serverless", accent: "currentColor",
    icon: <svg fill="none" height="28" viewBox="0 0 24 24" width="28"><path d="M11 12.8182H8.14625C7.64422 12.8182 7.33593 12.2685 7.59771 11.8401L11.8086 4.94955C12.1472 4.39556 13 4.63552 13 5.28477V11.1818H15.8538C16.3558 11.1818 16.6641 11.7315 16.4023 12.1599L12.1914 19.0504C11.8528 19.6044 11 19.3645 11 18.7152V12.8182Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" /></svg>,
    frameworks: ["Edge Functions", "Cloudflare Workers", "AWS Lambda", "Vercel Functions"],
    githubUrl: "https://github.com/resend/resend-node-example",
    zipUrl: "https://github.com/resend/resend-node-example/archive/refs/heads/main.zip",
  },
  {
    id: "ruby", label: "Ruby", accent: "currentColor",
    icon: <svg fill="currentColor" height="28" viewBox="0 0 24 24" width="28"><path d="M14.122 5.55076C14.0615 5.52112 13.9932 5.50744 13.925 5.50963L10.8827 5.53668C10.8351 5.53711 10.7845 5.54391 10.7403 5.56177L8.31495 6.39642C8.2786 6.40627 8.24389 6.42087 8.214 6.44178L5.99785 7.88438C5.92859 7.92946 5.8738 7.99347 5.83812 8.06683C5.83501 8.07321 5.83036 8.08278 5.82571 8.09235L4.24961 11.3333C4.19841 11.4386 4.18864 11.5641 4.22623 11.6733C4.098 12.1398 4.00318 12.6186 4.15683 13.0651C4.39546 13.7585 4.96624 14.2394 5.71277 14.5535L5.70346 14.5727L13.859 18.5656L17.2191 11.6563C17.23 11.6339 17.2408 11.6116 17.2501 11.5925L18.0289 9.99115L18.0225 9.98803C18.2605 9.40945 18.3162 8.82455 18.1217 8.25935C17.968 7.81289 17.5986 7.4938 17.2105 7.20504C17.1697 7.09424 17.0879 7.00286 16.9828 6.95139L14.1284 5.55388Z" /></svg>,
    frameworks: ["Rails", "Sinatra", "Rack"],
    githubUrl: "https://github.com/resend/resend-ruby-example",
    zipUrl: "https://github.com/resend/resend-ruby-example/archive/refs/heads/main.zip",
  },
  {
    id: "python", label: "Python", accent: "currentColor",
    icon: <svg fill="currentColor" height="28" viewBox="0 0 24 24" width="28"><path clipRule="evenodd" d="M8.92308 6.34188C8.92308 6.14145 9.10073 5.81724 9.69579 5.51187C10.2601 5.2223 11.0743 5.02564 12 5.02564C12.9257 5.02564 13.7399 5.2223 14.3042 5.51187C14.8993 5.81724 15.0769 6.14145 15.0769 6.34188L15.0768 8.41025V8.58119C15.0768 9.42328 15.0233 10.0118 14.9146 10.4281C14.8088 10.8329 14.6614 11.0364 14.4939 11.1606C14.313 11.2945 14.0407 11.3872 13.5869 11.4368C13.1321 11.4865 12.5656 11.4872 11.829 11.4872H11.803C11.1831 11.4872 10.623 11.4872 10.1514 11.5443C9.6692 11.6028 9.2122 11.7273 8.83772 12.0269C8.4557 12.3325 8.22386 12.7678 8.08632 13.3179C7.96911 13.7868 7.91331 14.3669 7.90039 15.0769H6.34188C6.14145 15.0769 5.81723 14.8993 5.51187 14.3042C5.22229 13.7399 5.02564 12.9257 5.02564 12C5.02564 11.0743 5.22229 10.2601 5.51187 9.6958C5.81723 9.10073 6.14145 8.92308 6.34188 8.92308H8.41026H12V7.89744H8.92308V6.34188ZM6.34188 16.1026H7.89741L7.89744 17.6582C7.89744 18.4489 8.52337 19.0393 9.22754 19.4006C9.96246 19.7777 10.9431 20 12 20C13.0569 20 14.0375 19.7777 14.7724 19.4006C15.4766 19.0393 16.1026 18.4489 16.1026 17.6582V16.1026H17.6581C18.4489 16.1026 19.0393 15.4766 19.4006 14.7724C19.7777 14.0375 20 13.0569 20 12C20 10.9431 19.7777 9.96246 19.4006 9.22754C19.0393 8.52338 18.4489 7.89744 17.6581 7.89744H16.1026V6.34189C16.1026 5.55103 15.4766 4.96071 14.7724 4.59937C14.0375 4.22223 13.0569 4 12 4C10.9431 4 9.96246 4.22223 9.22754 4.59937C8.52337 4.96071 7.89744 5.55103 7.89744 6.34188V7.89744H6.34188C5.55102 7.89744 4.96071 8.52338 4.59937 9.22754C4.22223 9.96246 4 10.9431 4 12C4 13.0569 4.22223 14.0375 4.59937 14.7724C4.96071 15.4766 5.55102 16.1026 6.34188 16.1026ZM12 16.1026H15.0769V17.6582C15.0769 17.8586 14.8993 18.1828 14.3042 18.4881C13.7399 18.7777 12.9257 18.9744 12 18.9744C11.0743 18.9744 10.2601 18.7777 9.69579 18.4881C9.10073 18.1828 8.92308 17.8586 8.92308 17.6582L8.92303 15.5897V15.4188C8.92303 14.5776 8.97644 13.9862 9.08133 13.5667C9.18418 13.1553 9.32627 12.9495 9.47843 12.8278C9.63814 12.7 9.87559 12.6109 10.2748 12.5625C10.678 12.5136 11.1772 12.5128 11.829 12.5128H11.8539C12.56 12.5128 13.1816 12.5128 13.6983 12.4564C14.222 12.3991 14.7082 12.2781 15.1043 11.9847C15.5136 11.6816 15.7615 11.2441 15.9069 10.6873C16.0301 10.2157 16.0865 9.63309 16.0995 8.92308H17.6581C17.8586 8.92308 18.1828 9.10073 18.4881 9.6958C18.7776 10.2601 18.9744 11.0743 18.9744 12C18.9744 12.9257 18.7776 13.7399 18.4881 14.3042C18.1828 14.8993 17.8586 15.0769 17.6581 15.0769H15.5898H12V16.1026Z" fillRule="evenodd" /></svg>,
    frameworks: ["Django", "Flask", "FastAPI"],
    githubUrl: "https://github.com/resend/resend-python-example",
    zipUrl: "https://github.com/resend/resend-python-example/archive/refs/heads/main.zip",
  },
  {
    id: "php", label: "PHP", accent: "currentColor",
    icon: <svg fill="currentColor" height="28" viewBox="0 0 24 24" width="28"><path clipRule="evenodd" d="M10.1777 8.04773C10.1833 8.02002 10.2083 8 10.2374 8H11.452C11.4702 8 11.4874 8.00787 11.499 8.02145C11.5105 8.03503 11.5152 8.05291 11.5118 8.07018L11.237 9.44244C11.3496 9.4421 11.4616 9.44104 11.5724 9.43999C11.9477 9.43642 12.3082 9.433 12.6286 9.45808C13.0631 9.4921 13.441 9.57927 13.6913 9.80286C13.822 9.91927 13.9066 10.0465 13.9486 10.2148C13.99 10.3806 13.989 10.5828 13.9568 10.8479C13.914 11.2002 13.814 11.676 13.6735 12.3444C13.6032 12.6791 13.5226 13.0621 13.4341 13.5021C13.4285 13.5298 13.4034 13.5498 13.3743 13.5498H12.144C12.1258 13.5498 12.1086 13.5419 12.097 13.5283C12.0855 13.5148 12.0808 13.4969 12.0843 13.4796C12.1804 12.9997 12.2617 12.6027 12.3293 12.2731C12.442 11.7229 12.5163 11.3602 12.5566 11.1128C12.5889 10.9144 12.5981 10.7965 12.5897 10.7178C12.5819 10.6446 12.5592 10.6068 12.521 10.5671C12.4492 10.4923 12.3252 10.455 12.0772 10.4412C11.9096 10.4318 11.696 10.4333 11.4195 10.4351C11.3043 10.4359 11.1781 10.4368 11.04 10.4369L10.4232 13.5021C10.4177 13.5298 10.3926 13.5498 10.3635 13.5498H9.15025C9.13208 13.5498 9.11486 13.5419 9.10329 13.5283C9.09173 13.5148 9.08705 13.4969 9.0905 13.4796L10.1777 8.04773ZM5.08963 9.4941C5.09518 9.46639 5.12023 9.44638 5.14938 9.44638H7.49973C8.21358 9.44638 8.75365 9.62601 9.09241 10.0047C9.4176 10.3666 9.51615 10.9026 9.42659 11.4404C9.33688 11.979 9.05731 12.5285 8.61259 12.9247C7.89608 13.5747 7.12117 13.5681 6.00628 13.5586C5.88221 13.5575 5.75393 13.5564 5.62105 13.5562L5.34174 14.9522C5.33619 14.98 5.31114 15 5.28199 15H4.06085C4.04268 15 4.02547 14.9921 4.01391 14.9785C4.00235 14.965 3.99765 14.9471 4.00112 14.9298L5.08963 9.4941ZM14.6303 9.4941C14.6358 9.46639 14.6609 9.44638 14.69 9.44638H17.0417C17.7556 9.44638 18.2956 9.62601 18.6343 10.0047C18.9595 10.3666 19.0581 10.9026 18.9685 11.4404C18.8788 11.979 18.5993 12.5285 18.1545 12.9247C17.4428 13.5695 16.7021 13.565 15.5193 13.5578C15.4049 13.5571 15.2861 13.5564 15.1631 13.5562L14.8837 14.9522C14.8781 14.98 14.8531 15 14.824 15H13.6002C13.582 15 13.5648 14.9921 13.5532 14.9785C13.5417 14.965 13.537 14.9471 13.5404 14.9298L14.6303 9.4941ZM6.25395 10.4216L5.82189 12.5785C6.22236 12.5822 6.39232 12.584 6.5547 12.579C6.80406 12.5713 7.02832 12.5477 7.22375 12.4855C7.41794 12.4238 7.58352 12.3242 7.71673 12.1635C7.85047 12.0022 7.9546 11.7757 8.01904 11.4558C8.1102 10.9973 8.04265 10.7541 7.88596 10.6178C7.69616 10.5008 7.41713 10.4391 7.06209 10.4204L6.25395 10.4216ZM15.7919 10.4216L15.3599 12.5785C15.7686 12.5834 15.9268 12.5855 16.0799 12.5817C16.3276 12.5754 16.5525 12.5535 16.7496 12.4925C16.9455 12.4319 17.1137 12.3327 17.2493 12.1712C17.3855 12.009 17.4918 11.7803 17.5571 11.4558C17.6482 10.9971 17.5818 10.7539 17.4261 10.6177C17.2375 10.5007 16.7936 10.4391 16.0801 10.4195L15.7919 10.4216Z" fillRule="evenodd" /></svg>,
    frameworks: ["Laravel", "Symfony", "WordPress"],
    githubUrl: "https://github.com/resend/resend-php-example",
    zipUrl: "https://github.com/resend/resend-php-example/archive/refs/heads/main.zip",
  },
  {
    id: "go", label: "Go", accent: "currentColor",
    icon: <svg fill="currentColor" height="28" viewBox="0 0 24 24" width="28"><path clipRule="evenodd" d="M11.8782 10.2346C11.5538 10.3275 11.2868 10.4074 11.0148 10.4888C10.7982 10.5536 10.5784 10.6194 10.3241 10.6934L10.3088 10.698C10.1845 10.7356 10.1715 10.7395 10.0558 10.5891C9.91709 10.4119 9.81534 10.2972 9.62107 10.1929C9.03829 9.86975 8.47401 9.96357 7.94673 10.3493C7.3177 10.808 6.99393 11.4857 7.00318 12.3302C7.01243 13.1642 7.5212 13.8523 8.252 13.967C8.88103 14.0608 9.40831 13.8106 9.82458 13.2789C9.88629 13.1939 9.94292 13.1031 10.0058 13.0025C10.0277 12.9673 10.0504 12.9309 10.0743 12.8932H8.289C8.09474 12.8932 8.04848 12.7576 8.11324 12.5804C8.2335 12.2572 8.45551 11.7151 8.58501 11.444C8.61277 11.3814 8.67752 11.2772 8.81627 11.2772H11.7933C11.927 10.7998 12.144 10.3487 12.4333 9.92191C13.1086 8.92106 13.9226 8.39979 15.0235 8.18085C15.967 7.99319 16.855 8.09745 17.6599 8.71256C18.3906 9.27554 18.8439 10.0366 18.9641 11.0375C19.1214 12.4449 18.7606 13.5917 17.9003 14.5716C17.2898 15.2701 16.5405 15.708 15.6802 15.9061C15.1909 15.9726 14.9401 16 14.9401 16C14.0984 15.9791 13.3306 15.708 12.6831 15.0826C12.2276 14.6388 11.9139 14.0935 11.758 13.4586C11.6498 13.7049 11.5204 13.9407 11.3694 14.1651C10.7034 15.1555 9.83383 15.7706 8.73303 15.9374C7.82648 16.073 6.98468 15.8749 6.24464 15.2493C5.5601 14.6655 5.17158 13.894 5.06982 12.9349C4.94957 11.7985 5.24558 10.7768 5.85611 9.88017C6.5129 8.9106 7.38245 8.29549 8.44625 8.07656C9.31581 7.89932 10.1483 8.014 10.8976 8.5874C11.3879 8.9523 11.7394 9.45273 11.9707 10.0574C12.0262 10.1512 11.9892 10.2034 11.8782 10.2346Z" fillRule="evenodd" /></svg>,
    frameworks: ["Gin", "Echo", "Fiber"],
    githubUrl: "https://github.com/resend/resend-go-example",
    zipUrl: "https://github.com/resend/resend-go-example/archive/refs/heads/main.zip",
  },
  {
    id: "rust", label: "Rust", accent: "currentColor",
    icon: <svg fill="currentColor" height="28" viewBox="0 0 24 24" width="28"><circle cx="12" cy="12" r="8" fill="none" stroke="currentColor" strokeWidth="1.5" /><path d="M8 12h8M12 8l4 4-4 4" /></svg>,
    frameworks: ["Actix", "Axum", "Rocket"],
    githubUrl: "https://github.com/resend/resend-rust-example",
    zipUrl: "https://github.com/resend/resend-rust-example/archive/refs/heads/main.zip",
  },
  {
    id: "java", label: "Java", accent: "currentColor",
    icon: <svg fill="currentColor" height="28" viewBox="0 0 24 24" width="28"><path d="M13.2188 2.25C14.2705 4.73145 9.44824 6.25195 9 8.32031C8.58984 10.2188 11.8564 12.4453 11.8594 12.4453C11.3613 11.6602 10.998 10.998 10.5 9.77344C9.65625 7.70508 15.6416 5.83887 13.2188 2.25ZM17.4375 12.0469C16.9951 12.0264 16.4971 12.1904 16.0547 12.5156C16.9277 12.3223 17.6719 12.8701 17.6719 13.5C17.6719 14.9121 15.6562 16.2422 15.6562 16.2422C15.6562 16.2422 18.7734 15.8936 18.7734 13.5703C18.7734 12.6123 18.1729 12.082 17.4375 12.0469ZM9.16406 12.0703C8.07715 12.1084 5.90625 12.2871 5.90625 13.125C5.90625 14.291 10.9629 14.3818 14.5781 13.6641C14.5781 13.6641 15.5625 12.9785 15.8203 12.7266C13.4502 13.2188 8.03906 13.2949 8.03906 12.8672C8.03906 12.4746 9.77344 12.0703 9.77344 12.0703C9.77344 12.0703 9.52734 12.0586 9.16406 12.0703ZM6.67969 17.3203C5.35547 17.2939 4.5 17.8945 4.5 18.3984C4.5 21.0791 18.0703 20.9502 18.0703 18.2109C18.0703 17.7568 17.5342 17.54 17.3438 17.4375C18.4512 20.0566 6.25781 19.8516 6.25781 18.3047C6.25781 17.9531 7.16016 17.6016 7.99219 17.7656L7.28906 17.3672C7.08105 17.335 6.87012 17.3232 6.67969 17.3203Z" /></svg>,
    frameworks: ["Spring Boot", "Quarkus", "Micronaut"],
    githubUrl: "https://github.com/resend/resend-java-example",
    zipUrl: "https://github.com/resend/resend-java-example/archive/refs/heads/main.zip",
  },
  {
    id: "elixir", label: "Elixir", accent: "currentColor",
    icon: <svg fill="currentColor" height="28" viewBox="0 0 24 24" width="28"><path clipRule="evenodd" d="M13.0662 4.75976L13.0932 4L12.2819 4.25395C10.8533 4.70111 9.59014 5.95818 8.44142 7.82718C7.59444 9.20526 6.58016 10.9392 6.17808 12.7399C5.77107 14.5627 5.98352 16.4966 7.64139 18.2031C8.4054 18.9894 9.43595 19.6324 10.7112 19.8852C11.9922 20.1391 13.4633 19.9878 15.0783 19.2708C16.4788 18.6489 17.3384 17.4647 17.7336 16.2791C18.1243 15.1071 18.0987 13.8189 17.5674 12.9329C16.6865 11.4637 15.7955 10.5143 15.0739 9.74556L14.952 9.61557C14.2055 8.81832 13.7155 8.25282 13.506 7.455C13.1826 6.22399 13.0459 5.33482 13.0662 4.75976ZM9.47529 8.32272C10.3192 6.94965 11.1458 6.06359 11.9328 5.57835C12.0012 6.16939 12.1463 6.87573 12.3601 7.68972C12.6395 8.75341 13.3069 9.48886 14.0455 10.2776L14.1626 10.4025C14.8796 11.1666 15.7045 12.0458 16.5279 13.419C16.869 13.9881 16.9418 14.9758 16.6051 15.9857C16.2729 16.9819 15.5795 17.8855 14.5498 18.3427C13.1397 18.9688 11.9457 19.0652 10.9688 18.8715C9.98626 18.6769 9.16622 18.1772 8.53417 17.5267C7.17433 16.127 6.97368 14.5464 7.33219 12.9409C7.69561 11.3133 8.62549 9.70538 9.47529 8.32272Z" fillRule="evenodd" /></svg>,
    frameworks: ["Phoenix", "Plug"],
    githubUrl: "https://github.com/resend/resend-elixir-example",
    zipUrl: "https://github.com/resend/resend-elixir-example/archive/refs/heads/main.zip",
  },
  {
    id: "dotnet", label: ".NET", accent: "currentColor",
    icon: <svg fill="none" height="28" viewBox="0 0 24 24" width="28"><path fillRule="evenodd" clipRule="evenodd" d="M9.41642 16.0984H10.8043V8.25H9.58191V13.3071C9.58191 13.8034 9.59972 14.1555 9.63529 14.3634H9.61396C9.57125 14.2759 9.47516 14.1153 9.3257 13.8818L5.79192 8.25H4.3133V16.0984H5.54107V10.9537C5.54107 10.4028 5.52683 10.0434 5.49836 9.8755H5.53041C5.59087 10.0324 5.66742 10.1838 5.75993 10.3298L9.41642 16.0984ZM1.7242 16.0053C1.87366 16.1476 2.05515 16.2188 2.26867 16.2188C2.48574 16.2188 2.66902 16.1476 2.81848 16.0053C2.9715 15.8594 3.04801 15.6861 3.04801 15.4854C3.04801 15.281 2.9715 15.1059 2.81848 14.96C2.66902 14.814 2.48574 14.7411 2.26867 14.7411C2.05515 14.7411 1.87366 14.814 1.7242 14.96C1.57473 15.1059 1.5 15.281 1.5 15.4854C1.5 15.6861 1.57473 15.8594 1.7242 16.0053ZM16.783 16.0984H12.486V8.25H16.6123V9.35559H13.7565V11.5776H16.3881V12.6777H13.7565V14.9983H16.783V16.0984ZM20.6907 9.35559H22.8899V8.25H17.2263V9.35559H19.4202V16.0984H20.6907V9.35559Z" fill="currentColor" /></svg>,
    frameworks: ["ASP.NET Core", "Blazor", "MAUI"],
    githubUrl: "https://github.com/resend/resend-dotnet-example",
    zipUrl: "https://github.com/resend/resend-dotnet-example/archive/refs/heads/main.zip",
  },
  {
    id: "rest", label: "REST", accent: "currentColor",
    icon: <svg fill="currentColor" height="28" viewBox="0 0 24 24" width="28"><path clipRule="evenodd" d="M10.0447 8C9.2163 8 8.54472 8.67158 8.54472 9.5V10.3716C8.54472 11.253 8.0886 12.0278 7.39952 12.473C8.0886 12.9182 8.54472 13.693 8.54472 14.5744V15.446C8.54472 16.2744 9.2163 16.946 10.0447 16.946H11.0894V17.946H10.0447C8.66401 17.946 7.54472 16.8267 7.54472 15.446V14.5744C7.54472 13.746 6.87315 13.0744 6.04472 13.0744H5V11.8716H6.04472C6.87315 11.8716 7.54472 11.2 7.54472 10.3716V9.5C7.54472 8.11929 8.66401 7 10.0447 7H11.0894V8H10.0447ZM13.5549 16.9464C14.3833 16.9464 15.0549 16.2748 15.0549 15.4464V14.5748C15.0549 13.6934 15.511 12.9186 16.2001 12.4734C15.511 12.0282 15.0549 11.2534 15.0549 10.372V9.5004C15.0549 8.67197 14.3833 8.0004 13.5549 8.0004L12.5102 8.0004V7.0004L13.5549 7.0004C14.9356 7.0004 16.0549 8.11969 16.0549 9.5004V10.372C16.0549 11.2004 16.7265 11.872 17.5549 11.872H18.5996V13.0748H17.5549C16.7265 13.0748 16.0549 13.7464 16.0549 14.5748V15.4464C16.0549 16.8271 14.9356 17.9464 13.5549 17.9464L12.5102 17.9464V16.9464L13.5549 16.9464Z" fillRule="evenodd" /></svg>,
    frameworks: ["cURL", "Postman", "Insomnia"],
    githubUrl: "https://resend.com/docs/api-reference/introduction",
    zipUrl: null,
  },
  {
    id: "smtp", label: "SMTP", accent: "currentColor",
    icon: <svg fill="none" height="28" viewBox="0 0 24 24" width="28"><path d="M3.646 15.108C3.124 15.108 2.674 15.015 2.296 14.829C1.918 14.643 1.603 14.385 1.351 14.055L1.999 13.434C2.233 13.716 2.488 13.926 2.764 14.064C3.04 14.202 3.346 14.271 3.682 14.271C4.078 14.271 4.381 14.181 4.591 14.001C4.801 13.815 4.906 13.557 4.906 13.227C4.906 12.951 4.828 12.741 4.672 12.597C4.516 12.453 4.252 12.351 3.88 12.291L3.196 12.174C2.632 12.078 2.221 11.877 1.963 11.571C1.711 11.265 1.585 10.884 1.585 10.428C1.585 9.846 1.774 9.399 2.152 9.087C2.536 8.769 3.067 8.61 3.745 8.61C4.225 8.61 4.642 8.688 4.996 8.844C5.356 9 5.647 9.225 5.869 9.519L5.239 10.149C5.059 9.921 4.846 9.747 4.6 9.627C4.36 9.507 4.075 9.447 3.745 9.447C3.373 9.447 3.088 9.528 2.89 9.69C2.698 9.846 2.602 10.08 2.602 10.392C2.602 10.65 2.68 10.854 2.836 11.004C2.992 11.148 3.262 11.25 3.646 11.31L4.312 11.427C4.864 11.523 5.272 11.721 5.536 12.021C5.8 12.321 5.932 12.702 5.932 13.164C5.932 13.554 5.842 13.896 5.662 14.19C5.488 14.484 5.23 14.712 4.888 14.874C4.546 15.03 4.132 15.108 3.646 15.108ZM11.6975 10.203L11.2025 11.202L9.81648 13.722L8.44848 11.202L7.94448 10.185H7.80048V15H6.82848V8.718H8.11548L9.80748 11.913H9.83448L11.5175 8.718H12.8135V15H11.8415V10.203H11.6975ZM16.444 9.564V15H15.436V9.564H13.465V8.718H18.415V9.564H16.444ZM18.7625 15V8.718H21.1115C21.6995 8.718 22.1525 8.886 22.4705 9.222C22.7945 9.558 22.9565 10.02 22.9565 10.608C22.9565 11.196 22.7945 11.658 22.4705 11.994C22.1525 12.33 21.6995 12.498 21.1115 12.498H19.7795V15H18.7625ZM19.7795 11.652H20.9495C21.2675 11.652 21.5045 11.583 21.6605 11.445C21.8165 11.301 21.8945 11.085 21.8945 10.797V10.419C21.8945 10.131 21.8165 9.915 21.6605 9.771C21.5045 9.627 21.2675 9.555 20.9495 9.555H19.7795V11.652Z" fill="currentColor" /></svg>,
    frameworks: ["Nodemailer", "JavaMail", "PHPMailer"],
    githubUrl: "https://resend.com/docs/send-with-smtp",
    zipUrl: null,
  },
];

const CODE_MAP = {
  nodejs: {
    "Node.js": `import { Resend } from 'resend';\n\nconst resend = new Resend('re_xxxxxxxxx');\n\n(async function () {\n  const { data, error } = await resend.emails.send({\n    from: 'onboarding@resend.dev',\n    to: 'delivered@resend.dev',\n    subject: 'Hello World',\n    html: '<strong>it works!</strong>',\n  });\n\n  if (error) {\n    return console.log(error);\n  }\n\n  console.log(data);\n})();`,
    "Next.js": `import { Resend } from 'resend';\n\nconst resend = new Resend(process.env.RESEND_API_KEY);\n\nexport async function POST() {\n  const { data, error } = await resend.emails.send({\n    from: 'onboarding@resend.dev',\n    to: 'delivered@resend.dev',\n    subject: 'Hello World',\n    html: '<strong>it works!</strong>',\n  });\n\n  if (error) {\n    return Response.json({ error }, { status: 500 });\n  }\n\n  return Response.json(data);\n}`,
    "Remix": `import { Resend } from 'resend';\nimport { json } from '@remix-run/node';\n\nconst resend = new Resend(process.env.RESEND_API_KEY);\n\nexport const action = async () => {\n  const { data, error } = await resend.emails.send({\n    from: 'onboarding@resend.dev',\n    to: 'delivered@resend.dev',\n    subject: 'Hello World',\n    html: '<strong>it works!</strong>',\n  });\n\n  if (error) return json({ error }, { status: 500 });\n  return json(data);\n};`,
    "Nuxt": `import { Resend } from 'resend';\n\nconst resend = new Resend(process.env.RESEND_API_KEY);\n\nexport default defineEventHandler(async () => {\n  const { data, error } = await resend.emails.send({\n    from: 'onboarding@resend.dev',\n    to: 'delivered@resend.dev',\n    subject: 'Hello World',\n    html: '<strong>it works!</strong>',\n  });\n\n  if (error) {\n    throw createError({ statusCode: 500, message: error.message });\n  }\n\n  return data;\n});`,
    "Express": `import express from 'express';\nimport { Resend } from 'resend';\n\nconst app = express();\nconst resend = new Resend(process.env.RESEND_API_KEY);\n\napp.post('/send', async (_req, res) => {\n  const { data, error } = await resend.emails.send({\n    from: 'onboarding@resend.dev',\n    to: 'delivered@resend.dev',\n    subject: 'Hello World',\n    html: '<strong>it works!</strong>',\n  });\n\n  if (error) return res.status(500).json({ error });\n  res.json(data);\n});\n\napp.listen(3000);`,
    "Hono": `import { Hono } from 'hono';\nimport { Resend } from 'resend';\n\nconst app = new Hono();\nconst resend = new Resend(process.env.RESEND_API_KEY);\n\napp.post('/send', async (c) => {\n  const { data, error } = await resend.emails.send({\n    from: 'onboarding@resend.dev',\n    to: 'delivered@resend.dev',\n    subject: 'Hello World',\n    html: '<strong>it works!</strong>',\n  });\n\n  if (error) return c.json({ error }, 500);\n  return c.json(data);\n});\n\nexport default app;`,
    "Redwood": `import { Resend } from 'resend';\n\nconst resend = new Resend(process.env.RESEND_API_KEY);\n\nexport const handler = async () => {\n  const { data, error } = await resend.emails.send({\n    from: 'onboarding@resend.dev',\n    to: 'delivered@resend.dev',\n    subject: 'Hello World',\n    html: '<strong>it works!</strong>',\n  });\n\n  return {\n    statusCode: error ? 500 : 200,\n    body: JSON.stringify(data),\n  };\n};`,
    "Bun": `import { Resend } from 'resend';\n\nconst resend = new Resend(Bun.env.RESEND_API_KEY);\n\nconst { data, error } = await resend.emails.send({\n  from: 'onboarding@resend.dev',\n  to: 'delivered@resend.dev',\n  subject: 'Hello World',\n  html: '<strong>it works!</strong>',\n});\n\nif (error) {\n  console.error(error);\n  process.exit(1);\n}\n\nconsole.log(data);`,
    "Astro": `import { Resend } from 'resend';\n\nconst resend = new Resend(import.meta.env.RESEND_API_KEY);\n\nexport const POST = async () => {\n  const { data, error } = await resend.emails.send({\n    from: 'onboarding@resend.dev',\n    to: 'delivered@resend.dev',\n    subject: 'Hello World',\n    html: '<strong>it works!</strong>',\n  });\n\n  if (error) {\n    return new Response(JSON.stringify({ error }), { status: 500 });\n  }\n\n  return new Response(JSON.stringify(data));\n};`,
  },
  serverless: {
    "Edge Functions": `export default async function handler() {\n  const res = await fetch('https://api.resend.com/emails', {\n    method: 'POST',\n    headers: {\n      Authorization: \`Bearer \${process.env.RESEND_API_KEY}\`,\n      'Content-Type': 'application/json',\n    },\n    body: JSON.stringify({\n      from: 'onboarding@resend.dev',\n      to: ['delivered@resend.dev'],\n      subject: 'Hello World',\n      html: '<strong>it works!</strong>',\n    }),\n  });\n\n  const data = await res.json();\n  return Response.json(data);\n}\n\nexport const config = { runtime: 'edge' };`,
    "Cloudflare Workers": `export default {\n  async fetch(_req, env) {\n    const res = await fetch('https://api.resend.com/emails', {\n      method: 'POST',\n      headers: {\n        Authorization: \`Bearer \${env.RESEND_API_KEY}\`,\n        'Content-Type': 'application/json',\n      },\n      body: JSON.stringify({\n        from: 'onboarding@resend.dev',\n        to: ['delivered@resend.dev'],\n        subject: 'Hello World',\n        html: '<strong>it works!</strong>',\n      }),\n    });\n    return res;\n  },\n};`,
    "AWS Lambda": `export const handler = async () => {\n  const res = await fetch('https://api.resend.com/emails', {\n    method: 'POST',\n    headers: {\n      Authorization: \`Bearer \${process.env.RESEND_API_KEY}\`,\n      'Content-Type': 'application/json',\n    },\n    body: JSON.stringify({\n      from: 'onboarding@resend.dev',\n      to: ['delivered@resend.dev'],\n      subject: 'Hello World',\n      html: '<strong>it works!</strong>',\n    }),\n  });\n\n  const data = await res.json();\n  return { statusCode: 200, body: JSON.stringify(data) };\n};`,
    "Vercel Functions": `export default async function handler(_req, res) {\n  const response = await fetch('https://api.resend.com/emails', {\n    method: 'POST',\n    headers: {\n      Authorization: \`Bearer \${process.env.RESEND_API_KEY}\`,\n      'Content-Type': 'application/json',\n    },\n    body: JSON.stringify({\n      from: 'onboarding@resend.dev',\n      to: ['delivered@resend.dev'],\n      subject: 'Hello World',\n      html: '<strong>it works!</strong>',\n    }),\n  });\n\n  const data = await response.json();\n  res.json(data);\n}`,
  },
  ruby: {
    "Rails": `require 'resend'\n\nResend.api_key = ENV['RESEND_API_KEY']\n\nparams = {\n  from: 'onboarding@resend.dev',\n  to: ['delivered@resend.dev'],\n  subject: 'Hello World',\n  html: '<strong>it works!</strong>',\n}\n\nsent = Resend::Emails.send(params)`,
    "Sinatra": `require 'sinatra'\nrequire 'resend'\n\nResend.api_key = ENV['RESEND_API_KEY']\n\npost '/send' do\n  content_type :json\n\n  params = {\n    from: 'onboarding@resend.dev',\n    to: ['delivered@resend.dev'],\n    subject: 'Hello World',\n    html: '<strong>it works!</strong>',\n  }\n\n  Resend::Emails.send(params).to_json\nend`,
    "Rack": `require 'resend'\n\nResend.api_key = ENV['RESEND_API_KEY']\n\napp = lambda do |_env|\n  data = Resend::Emails.send({\n    from: 'onboarding@resend.dev',\n    to: ['delivered@resend.dev'],\n    subject: 'Hello World',\n    html: '<strong>it works!</strong>',\n  })\n  [200, { 'Content-Type' => 'application/json' }, [data.to_json]]\nend\n\nrun app`,
  },
  python: {
    "Django": `import resend\nfrom django.http import JsonResponse\nfrom django.views import View\n\nresend.api_key = "re_xxxxxxxxx"\n\nclass SendEmailView(View):\n    def post(self, request):\n        params: resend.Emails.SendParams = {\n            "from": "onboarding@resend.dev",\n            "to": ["delivered@resend.dev"],\n            "subject": "Hello World",\n            "html": "<strong>it works!</strong>",\n        }\n        email = resend.Emails.send(params)\n        return JsonResponse(email)`,
    "Flask": `import resend\nfrom flask import Flask, jsonify\n\napp = Flask(__name__)\nresend.api_key = "re_xxxxxxxxx"\n\n@app.route("/send", methods=["POST"])\ndef send_email():\n    params: resend.Emails.SendParams = {\n        "from": "onboarding@resend.dev",\n        "to": ["delivered@resend.dev"],\n        "subject": "Hello World",\n        "html": "<strong>it works!</strong>",\n    }\n    email = resend.Emails.send(params)\n    return jsonify(email)`,
    "FastAPI": `import resend\nfrom fastapi import FastAPI\n\napp = FastAPI()\nresend.api_key = "re_xxxxxxxxx"\n\n@app.post("/send")\nasync def send_email():\n    params: resend.Emails.SendParams = {\n        "from": "onboarding@resend.dev",\n        "to": ["delivered@resend.dev"],\n        "subject": "Hello World",\n        "html": "<strong>it works!</strong>",\n    }\n    return resend.Emails.send(params)`,
  },
  php: {
    "Laravel": `<?php\n\nuse Resend\\Laravel\\Facades\\Resend;\nuse Illuminate\\Support\\Facades\\Route;\n\nRoute::post('/send', function () {\n    $email = Resend::emails()->send([\n        'from' => 'onboarding@resend.dev',\n        'to' => ['delivered@resend.dev'],\n        'subject' => 'Hello World',\n        'html' => '<strong>it works!</strong>',\n    ]);\n\n    return response()->json($email);\n});`,
    "Symfony": `<?php\n\nuse Resend;\n\n$resend = Resend::client('re_xxxxxxxxx');\n\n$email = $resend->emails->send([\n    'from' => 'onboarding@resend.dev',\n    'to' => ['delivered@resend.dev'],\n    'subject' => 'Hello World',\n    'html' => '<strong>it works!</strong>',\n]);`,
    "WordPress": `<?php\n\n$resend = Resend::client(get_option('resend_api_key'));\n\n$email = $resend->emails->send([\n    'from' => 'hello@example.com',\n    'to' => ['user@example.com'],\n    'subject' => 'Hello from WordPress',\n    'html' => '<strong>it works!</strong>',\n]);`,
  },
  go: {
    "Gin": `package main\n\nimport (\n  "context"\n  "github.com/gin-gonic/gin"\n  "github.com/resend/resend-go/v2"\n)\n\nfunc main() {\n  r := gin.Default()\n  client := resend.NewClient("re_xxxxxxxxx")\n\n  r.POST("/send", func(c *gin.Context) {\n    params := &resend.SendEmailRequest{\n      From:    "onboarding@resend.dev",\n      To:      []string{"delivered@resend.dev"},\n      Subject: "Hello World",\n      Html:    "<strong>it works!</strong>",\n    }\n    sent, _ := client.Emails.SendWithContext(context.TODO(), params)\n    c.JSON(200, sent)\n  })\n\n  r.Run()\n}`,
    "Echo": `package main\n\nimport (\n  "context"\n  "github.com/labstack/echo/v4"\n  "github.com/resend/resend-go/v2"\n)\n\nfunc main() {\n  e := echo.New()\n  client := resend.NewClient("re_xxxxxxxxx")\n\n  e.POST("/send", func(c echo.Context) error {\n    params := &resend.SendEmailRequest{\n      From:    "onboarding@resend.dev",\n      To:      []string{"delivered@resend.dev"},\n      Subject: "Hello World",\n      Html:    "<strong>it works!</strong>",\n    }\n    sent, _ := client.Emails.SendWithContext(context.TODO(), params)\n    return c.JSON(200, sent)\n  })\n\n  e.Start(":3000")\n}`,
    "Fiber": `package main\n\nimport (\n  "context"\n  "github.com/gofiber/fiber/v2"\n  "github.com/resend/resend-go/v2"\n)\n\nfunc main() {\n  app := fiber.New()\n  client := resend.NewClient("re_xxxxxxxxx")\n\n  app.Post("/send", func(c *fiber.Ctx) error {\n    params := &resend.SendEmailRequest{\n      From:    "onboarding@resend.dev",\n      To:      []string{"delivered@resend.dev"},\n      Subject: "Hello World",\n      Html:    "<strong>it works!</strong>",\n    }\n    sent, _ := client.Emails.SendWithContext(context.TODO(), params)\n    return c.JSON(sent)\n  })\n\n  app.Listen(":3000")\n}`,
  },
  rust: {
    "Actix": `use resend_rs::{Resend, types::CreateEmailBaseOptions};\nuse actix_web::{web, App, HttpServer, HttpResponse};\n\nasync fn send_email() -> HttpResponse {\n    let resend = Resend::new("re_xxxxxxxxx");\n    let email = CreateEmailBaseOptions::new(\n        "onboarding@resend.dev",\n        ["delivered@resend.dev"],\n        "Hello World",\n    ).with_html("<strong>it works!</strong>");\n\n    let res = resend.emails.send(email).await.unwrap();\n    HttpResponse::Ok().json(res)\n}\n\n#[actix_web::main]\nasync fn main() -> std::io::Result<()> {\n    HttpServer::new(|| {\n        App::new().route("/send", web::post().to(send_email))\n    })\n    .bind("127.0.0.1:8080")?\n    .run()\n    .await\n}`,
    "Axum": `use resend_rs::{Resend, types::CreateEmailBaseOptions};\nuse axum::{routing::post, Router, Json};\nuse serde_json::Value;\n\nasync fn send_email() -> Json<Value> {\n    let resend = Resend::new("re_xxxxxxxxx");\n    let email = CreateEmailBaseOptions::new(\n        "onboarding@resend.dev",\n        ["delivered@resend.dev"],\n        "Hello World",\n    ).with_html("<strong>it works!</strong>");\n\n    let result = resend.emails.send(email).await.unwrap();\n    Json(serde_json::json!(result))\n}\n\n#[tokio::main]\nasync fn main() {\n    let app = Router::new().route("/send", post(send_email));\n    axum::serve(tokio::net::TcpListener::bind("0.0.0.0:3000").await.unwrap(), app)\n        .await.unwrap();\n}`,
    "Rocket": `#[macro_use] extern crate rocket;\nuse resend_rs::{Resend, types::CreateEmailBaseOptions};\n\n#[post("/send")]\nasync fn send_email() -> String {\n    let resend = Resend::new("re_xxxxxxxxx");\n    let email = CreateEmailBaseOptions::new(\n        "onboarding@resend.dev",\n        ["delivered@resend.dev"],\n        "Hello World",\n    ).with_html("<strong>it works!</strong>");\n\n    let result = resend.emails.send(email).await.unwrap();\n    format!("{:?}", result)\n}\n\n#[launch]\nfn rocket() -> _ {\n    rocket::build().mount("/", routes![send_email])\n}`,
  },
  java: {
    "Spring Boot": `import com.resend.*;\nimport com.resend.services.emails.model.CreateEmailOptions;\nimport org.springframework.web.bind.annotation.*;\nimport java.util.List;\n\n@RestController\npublic class EmailController {\n    private final Resend resend = new Resend("re_xxxxxxxxx");\n\n    @PostMapping("/send")\n    public Object sendEmail() throws ResendException {\n        CreateEmailOptions params = CreateEmailOptions.builder()\n            .from("onboarding@resend.dev")\n            .to(List.of("delivered@resend.dev"))\n            .subject("Hello World")\n            .html("<strong>it works!</strong>")\n            .build();\n\n        return resend.emails().send(params);\n    }\n}`,
    "Quarkus": `import com.resend.*;\nimport com.resend.services.emails.model.CreateEmailOptions;\nimport jakarta.ws.rs.*;\nimport jakarta.ws.rs.core.MediaType;\nimport java.util.List;\n\n@Path("/send")\n@Produces(MediaType.APPLICATION_JSON)\npublic class EmailResource {\n    private final Resend resend = new Resend("re_xxxxxxxxx");\n\n    @POST\n    public Object send() throws ResendException {\n        return resend.emails().send(\n            CreateEmailOptions.builder()\n                .from("onboarding@resend.dev")\n                .to(List.of("delivered@resend.dev"))\n                .subject("Hello World")\n                .html("<strong>it works!</strong>")\n                .build()\n        );\n    }\n}`,
    "Micronaut": `import com.resend.*;\nimport com.resend.services.emails.model.CreateEmailOptions;\nimport io.micronaut.http.annotation.*;\nimport java.util.List;\n\n@Controller("/send")\npublic class EmailController {\n    private final Resend resend = new Resend("re_xxxxxxxxx");\n\n    @Post\n    public Object send() throws ResendException {\n        return resend.emails().send(\n            CreateEmailOptions.builder()\n                .from("onboarding@resend.dev")\n                .to(List.of("delivered@resend.dev"))\n                .subject("Hello World")\n                .html("<strong>it works!</strong>")\n                .build()\n        );\n    }\n}`,
  },
  elixir: {
    "Phoenix": `defmodule MyAppWeb.EmailController do\n  use MyAppWeb, :controller\n\n  def send(conn, _params) do\n    {:ok, email} = Resend.Emails.send(%{\n      from: "onboarding@resend.dev",\n      to: ["delivered@resend.dev"],\n      subject: "Hello World",\n      html: "<strong>it works!</strong>"\n    })\n\n    json(conn, email)\n  end\nend`,
    "Plug": `defmodule MyApp.Router do\n  use Plug.Router\n\n  plug :match\n  plug :dispatch\n\n  post "/send" do\n    {:ok, email} = Resend.Emails.send(%{\n      from: "onboarding@resend.dev",\n      to: ["delivered@resend.dev"],\n      subject: "Hello World",\n      html: "<strong>it works!</strong>"\n    })\n\n    send_resp(conn, 200, Jason.encode!(email))\n  end\nend`,
  },
  dotnet: {
    "ASP.NET Core": `using Resend;\n\nvar builder = WebApplication.CreateBuilder(args);\nbuilder.Services.AddResend(options =>\n    options.ApiToken = Environment.GetEnvironmentVariable("RESEND_API_KEY")!\n);\n\nvar app = builder.Build();\n\napp.MapPost("/send", async (IResend resend) => {\n    var message = new EmailMessage();\n    message.From = "onboarding@resend.dev";\n    message.To.Add("delivered@resend.dev");\n    message.Subject = "Hello World";\n    message.HtmlBody = "<strong>it works!</strong>";\n\n    var resp = await resend.EmailSendAsync(message);\n    return Results.Ok(resp);\n});\n\napp.Run();`,
    "Blazor": `@inject IResend Resend\n\n@code {\n    private async Task SendEmail() {\n        var message = new EmailMessage();\n        message.From = "onboarding@resend.dev";\n        message.To.Add("delivered@resend.dev");\n        message.Subject = "Hello World";\n        message.HtmlBody = "<strong>it works!</strong>";\n\n        await Resend.EmailSendAsync(message);\n    }\n}`,
    "MAUI": `using Resend;\n\npublic class EmailService(IResend resend) {\n    public async Task SendEmailAsync() {\n        var message = new EmailMessage();\n        message.From = "onboarding@resend.dev";\n        message.To.Add("delivered@resend.dev");\n        message.Subject = "Hello World";\n        message.HtmlBody = "<strong>it works!</strong>";\n\n        await resend.EmailSendAsync(message);\n    }\n}`,
  },
  rest: {
    "cURL": `curl -X POST 'https://api.resend.com/emails' \\\n  -H 'Authorization: Bearer re_xxxxxxxxx' \\\n  -H 'Content-Type: application/json' \\\n  -d '{\n    "from": "onboarding@resend.dev",\n    "to": ["delivered@resend.dev"],\n    "subject": "Hello World",\n    "html": "<strong>it works!</strong>"\n  }'`,
    "Postman": `// POST https://api.resend.com/emails\n// Headers:\n//   Authorization: Bearer re_xxxxxxxxx\n//   Content-Type: application/json\n\n// Body (raw JSON):\n{\n  "from": "onboarding@resend.dev",\n  "to": ["delivered@resend.dev"],\n  "subject": "Hello World",\n  "html": "<strong>it works!</strong>"\n}\n\n// Response:\n{\n  "id": "49a3999c-0ce1-4ea6-ab68-afcd6dc2e794"\n}`,
    "Insomnia": `// New POST Request in Insomnia\n// URL: https://api.resend.com/emails\n//\n// Auth → Bearer Token: re_xxxxxxxxx\n//\n// Body → JSON:\n{\n  "from": "onboarding@resend.dev",\n  "to": ["delivered@resend.dev"],\n  "subject": "Hello World",\n  "html": "<strong>it works!</strong>"\n}`,
  },
  smtp: {
    "Nodemailer": `import nodemailer from 'nodemailer';\n\nconst transporter = nodemailer.createTransport({\n  host: 'smtp.resend.com',\n  secure: true,\n  port: 465,\n  auth: {\n    user: 'resend',\n    pass: 're_xxxxxxxxx',\n  },\n});\n\nconst info = await transporter.sendMail({\n  from: 'onboarding@resend.dev',\n  to: 'delivered@resend.dev',\n  subject: 'Hello World',\n  html: '<strong>it works!</strong>',\n});\n\nconsole.log(info.messageId);`,
    "JavaMail": `import jakarta.mail.*;\nimport jakarta.mail.internet.*;\nimport java.util.Properties;\n\nProperties props = new Properties();\nprops.put("mail.smtp.auth", "true");\nprops.put("mail.smtp.starttls.enable", "true");\nprops.put("mail.smtp.host", "smtp.resend.com");\nprops.put("mail.smtp.port", "587");\n\nSession session = Session.getInstance(props,\n    new Authenticator() {\n        protected PasswordAuthentication getPasswordAuthentication() {\n            return new PasswordAuthentication("resend", "re_xxxxxxxxx");\n        }\n    }\n);\n\nMessage message = new MimeMessage(session);\nmessage.setFrom(new InternetAddress("onboarding@resend.dev"));\nmessage.setRecipient(Message.RecipientType.TO,\n    new InternetAddress("delivered@resend.dev"));\nmessage.setSubject("Hello World");\nmessage.setContent("<strong>it works!</strong>", "text/html");\n\nTransport.send(message);`,
    "PHPMailer": `<?php\nuse PHPMailer\\PHPMailer\\PHPMailer;\nuse PHPMailer\\PHPMailer\\SMTP;\n\n$mail = new PHPMailer(true);\n$mail->isSMTP();\n$mail->Host       = 'smtp.resend.com';\n$mail->SMTPAuth   = true;\n$mail->Username   = 'resend';\n$mail->Password   = 're_xxxxxxxxx';\n$mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;\n$mail->Port       = 587;\n\n$mail->setFrom('onboarding@resend.dev');\n$mail->addAddress('delivered@resend.dev');\n$mail->isHTML(true);\n$mail->Subject = 'Hello World';\n$mail->Body    = '<strong>it works!</strong>';\n\n$mail->send();`,
  },
};

/* ─────────────────────────────────────────────────────────────
   SYNTAX TOKENIZER
───────────────────────────────────────────────────────────── */
const KW_MAP = {
  nodejs: ["import", "from", "export", "const", "let", "var", "async", "function", "await", "return", "if", "else", "new", "default", "this", "true", "false", "null", "undefined", "class", "extends"],
  serverless: ["export", "default", "const", "let", "var", "async", "function", "await", "return", "if", "else", "new", "class", "true", "false", "null"],
  ruby: ["require", "def", "end", "do", "class", "module", "return", "if", "else", "elsif", "unless", "true", "false", "nil", "lambda", "run"],
  python: ["import", "from", "def", "return", "class", "self", "async", "await", "if", "else", "for", "in", "with", "as", "pass", "None", "True", "False"],
  php: ["function", "return", "if", "else", "use", "class", "new", "echo", "public", "private", "protected", "static", "abstract", "interface", "namespace", "true", "false", "null"],
  go: ["package", "import", "func", "var", "const", "type", "return", "if", "else", "for", "defer", "go", "chan", "struct", "interface", "make", "new", "nil", "true", "false"],
  rust: ["use", "fn", "let", "mut", "pub", "struct", "impl", "async", "await", "return", "if", "else", "match", "for", "while", "loop", "true", "false", "None", "Some", "Ok", "Err"],
  java: ["import", "public", "private", "class", "void", "return", "new", "static", "final", "interface", "extends", "implements", "if", "else", "for", "try", "catch", "throw", "throws", "null", "true", "false"],
  elixir: ["defmodule", "def", "defp", "use", "import", "alias", "require", "end", "do", "case", "when", "if", "else", "with", "nil", "true", "false"],
  dotnet: ["using", "var", "async", "await", "public", "private", "class", "void", "return", "new", "static", "namespace", "if", "else", "true", "false", "null"],
  rest: [],
  smtp: ["import", "const", "let", "var", "async", "await", "return", "if", "new", "require", "use", "class", "public", "private", "async"],
};

function simpleTokenize(line, langId) {
  const kws = KW_MAP[langId] ?? [];
  // Detect full-line comment
  const trimmed = line.trimStart();
  if (/^(\/\/|#|--|\/\*|\*|@|<\?php)/.test(trimmed)) {
    return [{ t: "comment", v: line }];
  }

  const out = [];
  let i = 0;

  while (i < line.length) {
    const ch = line[i];

    // String: single, double, backtick
    if (ch === '"' || ch === "'" || ch === "`") {
      let s = ch; let j = i + 1;
      while (j < line.length) {
        if (line[j] === "\\" && j + 1 < line.length) { s += line[j] + line[j + 1]; j += 2; continue; }
        s += line[j];
        if (line[j] === ch) { j++; break; }
        j++;
      }
      out.push({ t: "string", v: s });
      i = j; continue;
    }

    // Inline comment
    if (ch === "/" && line[i + 1] === "/") { out.push({ t: "comment", v: line.slice(i) }); break; }
    if (ch === "#" && (i === 0 || /\s/.test(line[i - 1]))) { out.push({ t: "comment", v: line.slice(i) }); break; }

    // Word / keyword
    if (/[a-zA-Z_$]/.test(ch)) {
      let w = ""; let j = i;
      while (j < line.length && /[\w$]/.test(line[j])) { w += line[j++]; }
      if (kws.includes(w)) out.push({ t: "kw", v: w });
      else out.push({ t: "plain", v: w });
      i = j; continue;
    }

    // Number
    if (/[0-9]/.test(ch) && (i === 0 || /\W/.test(line[i - 1]))) {
      let n = ""; let j = i;
      while (j < line.length && /[\d._]/.test(line[j])) { n += line[j++]; }
      out.push({ t: "num", v: n });
      i = j; continue;
    }

    // Operator / punct
    out.push({ t: "plain", v: ch });
    i++;
  }
  return out;
}

const T_COLOR = {
  kw: "#8b9cf4",
  string: "rgb(255, 255, 146)",
  comment: "#4b5563",
  num: "#fb923c",
  plain: "#e2e8f0",
};

function HighlightedLine({ code, n }) {
  // detect lang from outer scope via closure — we pass langId as prop
  return null; // replaced below
}

function CodeLine({ code, n, langId }) {
  const tokens = simpleTokenize(code, langId);
  return (
    <div style={{ display: "flex", minHeight: "1.5rem" }}>
      <span style={{
        minWidth: "2.5rem", paddingRight: "1.25rem",
        textAlign: "right", color: "#374151",
        userSelect: "none", flexShrink: 0, fontSize: "0.8125rem",
        lineHeight: "1.625rem",
      }}>{n}</span>
      <span style={{ lineHeight: "1.625rem" }}>
        {tokens.map((tok, i) => (
          <span key={i} style={{ color: T_COLOR[tok.t] ?? T_COLOR.plain }}>{tok.v}</span>
        ))}
      </span>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   ICONS
───────────────────────────────────────────────────────────── */
function IconGithub({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.341-3.369-1.341-.454-1.155-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.547 9.547 0 0112 6.836c.85.004 1.705.114 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.138 20.161 22 16.416 22 12c0-5.523-4.477-10-10-10z" />
    </svg>
  );
}

function IconDownload({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  );
}

function IconCopy({ size = 15 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <rect x="9" y="9" width="13" height="13" rx="2" />
      <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
    </svg>
  );
}

function IconCheck({ size = 15 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 6L9 17l-5-5" />
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────────
   ANIMATED ORB icon
───────────────────────────────────────────────────────────── */
function AnimatedOrb() {
  return (
    <div className="int-orb-wrap">
      <div className="int-orb-glow-a" />
      <div className="int-orb-glow-b" />
      <div className="int-orb-shell">
        <div className="int-orb-inner">
          {/* Envelope */}
          <svg width="54" height="54" viewBox="0 0 54 54" fill="none" className="int-orb-icon">
            <rect x="7" y="14" width="40" height="26" rx="3.5" stroke="rgba(255,255,255,0.55)" strokeWidth="1.5" />
            <path d="M7 18.5L27 32L47 18.5" stroke="rgba(255,255,255,0.45)" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          {/* Orbit ring */}
          <div className="int-orb-ring" />
        </div>
      </div>
      {/* Orbiting dot */}
      <div className="int-orb-satellite" />
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   MAIN EXPORT
───────────────────────────────────────────────────────────── */
export default function Integrate() {
  const [activeLang, setActiveLang] = useState("nodejs");
  const [activeFw, setActiveFw] = useState("Node.js");
  const [copied, setCopied] = useState(false);
  const [panelKey, setPanelKey] = useState(0); // force re-mount for fade anim

  const lang = LANGUAGES.find((l) => l.id === activeLang) ?? LANGUAGES[0];
  const snippets = CODE_MAP[activeLang] ?? {};
  const code = snippets[activeFw] ?? Object.values(snippets)[0] ?? "";
  const lines = code.split("\n");

  const switchLang = useCallback((id) => {
    setActiveLang(id);
    const l = LANGUAGES.find((x) => x.id === id);
    if (l) setActiveFw(l.frameworks[0]);
    setPanelKey((k) => k + 1);
  }, []);

  const switchFw = useCallback((fw) => {
    setActiveFw(fw);
    setPanelKey((k) => k + 1);
  }, []);

  const handleCopy = async () => {
    try { await navigator.clipboard.writeText(code); } catch { }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="int-section">

      {/* ── Animated orb ── */}
      <div className="int-orb-container">
        <AnimatedOrb />
      </div>

      {/* ── Headline ── */}
      <h2 className="int-title">
        Integrate{" "}
        <span className="int-title-gold">in 10 minutes</span>
      </h2>

      {/* ── Subtitle ── */}
      <p className="int-subtitle">
        Developer friendly libraries available for Node.js, Python, Ruby, Go, PHP, Elixir, Rust, Java, and REST.
      </p>

      {/* ── Content area ── */}
      <div className="int-content">

        {/* Language selector row */}
        <div className="int-lang-row-wrap">
          <div className="int-lang-row" role="tablist" aria-label="Programming language">
            {LANGUAGES.map((l) => {
              const active = activeLang === l.id;
              return (
                <button
                  key={l.id}
                  role="tab"
                  aria-selected={active}
                  onClick={() => switchLang(l.id)}
                  className={`int-lang-btn${active ? " int-lang-btn--on" : ""}`}
                  style={{ "--accent": l.accent }}
                  type="button"
                >
                  <span
                    className="int-lang-icon"
                    style={{ color: active ? l.accent : undefined }}
                  >
                    {l.icon}
                  </span>
                  <span className="int-lang-label">{l.label}</span>
                </button>
              );
            })}
          </div>
          <div className="int-lang-fade" aria-hidden="true" />
        </div>

        {/* Code card */}
        <div className="int-card">
          {/* Top shimmer line */}
          <div className="int-card-shimmer-top" aria-hidden="true" />
          <div className="int-card-shimmer-bot" aria-hidden="true" />

          {/* Card header: framework tabs + copy */}
          <header className="int-card-header">
            <div className="int-fw-tabs" role="tablist" aria-label="Framework">
              {lang.frameworks.map((fw) => {
                const active = activeFw === fw;
                return (
                  <button
                    key={fw}
                    role="tab"
                    aria-selected={active}
                    onClick={() => switchFw(fw)}
                    className={`int-fw-tab${active ? " int-fw-tab--on" : ""}`}
                    type="button"
                  >
                    <span
                      className="int-fw-icon"
                      style={{ color: active ? lang.accent : undefined }}
                    >
                      {lang.icon}
                    </span>
                    {fw}
                  </button>
                );
              })}
            </div>
            <div className="int-fw-fade" aria-hidden="true" />

            {/* Copy button */}
            <button
              className={`int-copy-btn${copied ? " int-copy-btn--done" : ""}`}
              onClick={handleCopy}
              aria-label="Copy code"
              title={copied ? "Copied!" : "Copy to clipboard"}
              type="button"
            >
              <span className="int-copy-icon">
                {copied ? <IconCheck /> : <IconCopy />}
              </span>
              <span className="int-copy-label">{copied ? "Copied!" : "Copy"}</span>
            </button>
          </header>

          {/* Code body */}
          <div className="int-code-body" key={panelKey}>
            <pre className="int-pre">
              {lines.map((line, i) => (
                <CodeLine key={i} code={line} n={i + 1} langId={activeLang} />
              ))}
            </pre>
          </div>

          {/* Footer: GitHub + Download */}
          <footer className="int-card-footer">
            <a
              className="int-footer-btn int-footer-btn--ghost"
              href={lang.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <IconGithub size={15} />
              <span>View on GitHub</span>
              <span className="int-footer-btn-arrow">↗</span>
            </a>
            {lang.zipUrl && (
              <a
                className="int-footer-btn int-footer-btn--outline"
                href={lang.zipUrl}
                target="_blank"
                rel="noopener noreferrer"
                download
              >
                <IconDownload size={14} />
                <span>Download ZIP</span>
              </a>
            )}
          </footer>
        </div>
      </div>

      {/* ══ Scoped CSS ══ */}
      <style>{`
        /* ─ Section shell ─ */
        .int-section {
          font-family: var(--font-body, 'Inter', system-ui, sans-serif);
          max-width: 62rem;
          margin: 0 auto;
          padding: 5rem 1.5rem 7rem;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        /* ──────────────────────────────────────────────────────
           ORB ANIMATION
        ────────────────────────────────────────────────────── */
        .int-orb-container {
          margin-bottom: 1.75rem;
        }

        .int-orb-wrap {
          position: relative;
          width: 120px;
          height: 120px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* Slow breathing glow blobs */
        .int-orb-glow-a,
        .int-orb-glow-b {
          position: absolute;
          border-radius: 50%;
          filter: blur(28px);
          animation: orbPulse 5s ease-in-out infinite;
        }
        .int-orb-glow-a {
          width: 90px; height: 90px;
          background: radial-gradient(circle, rgba(255, 197, 61, 0.2) 0%, transparent 70%);
          top: 8px; left: 8px;
          animation-delay: 0s;
        }
        .int-orb-glow-b {
          width: 70px; height: 70px;
          background: radial-gradient(circle, rgba(238, 137, 18, 0.15) 0%, transparent 70%);
          bottom: 10px; right: 10px;
          animation-delay: -2.5s;
        }
        @keyframes orbPulse {
          0%, 100% { opacity: 0.6; transform: scale(1); }
          50%       { opacity: 1;   transform: scale(1.18); }
        }

        /* Main shell sphere */
        .int-orb-shell {
          position: relative;
          width: 88px; height: 88px;
          border-radius: 50%;
          background: radial-gradient(circle at 38% 32%,
            rgba(255, 255, 255, 0.18) 0%,
            rgba(28, 25, 22, 0.9) 55%,
            rgba(8, 8, 8, 0.98) 100%
          );
          border: 1px solid rgba(255, 255, 255, 0.14);
          box-shadow:
            0 0 0 1px rgba(255,255,255,0.06) inset,
            0 20px 60px rgba(0, 0, 0, 0.8),
            0 4px 16px rgba(0, 0, 0, 0.6);
          animation: orbFloat 5.5s ease-in-out infinite;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1;
        }
        @keyframes orbFloat {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          33%       { transform: translateY(-7px) rotate(1.5deg); }
          66%       { transform: translateY(-4px) rotate(-1deg); }
        }

        .int-orb-inner {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .int-orb-icon {
          position: relative;
          z-index: 2;
          filter: drop-shadow(0 0 8px rgba(139,92,246,0.5));
        }

        /* Rotating ring inside sphere */
        .int-orb-ring {
          position: absolute;
          inset: -18px;
          border-radius: 50%;
          border: 1px dashed rgba(139,92,246,0.2);
          animation: orbRingSpin 12s linear infinite;
        }
        @keyframes orbRingSpin {
          to { transform: rotate(360deg); }
        }

        /* Orbiting satellite dot */
        .int-orb-satellite {
          position: absolute;
          top: 13px; left: 50%;
          width: 6px; height: 6px;
          border-radius: 50%;
          background: #a78bfa;
          box-shadow: 0 0 8px 2px rgba(167,139,250,0.7);
          transform-origin: 0 47px;
          animation: orbSpin 6s linear infinite;
          z-index: 2;
        }
        @keyframes orbSpin {
          to { transform: rotate(360deg); }
        }

        /* ──────────────────────────────────────────────────────
           HEADLINE
        ────────────────────────────────────────────────────── */
        .int-title {
          font-family: var(--font-domaine), Georgia, serif;
          font-feature-settings: 'ss01', 'ss04', 'ss11';
          font-size: clamp(2.5rem, 5.5vw, 3.8rem);
          font-weight: 400;
          letter-spacing: -0.025em;
          line-height: 1.15;
          color: #f1f5f9;
          text-align: center;
          margin: 0 0 0.875rem;
        }
        .int-title-gold {
          background: linear-gradient(130deg, #FFFF92 0%, #f59e0b 55%, #EE8912 100%);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }

        /* ──────────────────────────────────────────────────────
           SUBTITLE
        ────────────────────────────────────────────────────── */
        .int-subtitle {
          font-size: clamp(0.9375rem, 1.4vw, 1.0625rem);
          font-weight: 400;
          line-height: 1.7;
          color: rgba(255,255,255,0.48);
          text-align: center;
          max-width: 520px;
          margin: 0 0 3rem;
          letter-spacing: -0.01em;
        }

        /* ──────────────────────────────────────────────────────
           CONTENT COLUMN
        ────────────────────────────────────────────────────── */
        .int-content {
          width: 100%;
          max-width: 58rem;
        }

        /* ──────────────────────────────────────────────────────
           LANGUAGE ROW
        ────────────────────────────────────────────────────── */
        .int-lang-row-wrap {
          position: relative;
          margin-bottom: -1px; /* merge with card border */
        }
        .int-lang-row {
          display: flex;
          align-items: flex-end;
          gap: 1rem;
          overflow-x: auto;
          scrollbar-width: none;
          padding-bottom: 1.125rem;
          padding-right: 3rem;
          /* center on desktop */
          justify-content: center;
        }
        .int-lang-row::-webkit-scrollbar { display: none; }
        .int-lang-fade {
          position: absolute;
          right: 0;
          top: 0;
          height: 100%;
          width: 4.5rem;
          background: linear-gradient(to left, #000 0%, transparent 100%);
          pointer-events: none;
        }

        .int-lang-btn {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.55rem;
          background: transparent;
          border: none;
          cursor: pointer;
          padding: 0;
          color: rgba(255,255,255,0.38);
          flex-shrink: 0;
          outline: none;
          transition: color 0.22s cubic-bezier(0.4,0,0.2,1);
        }
        .int-lang-btn:hover { color: rgba(255,255,255,0.72); }
        .int-lang-btn--on  { color: rgba(255,255,255,0.9);  }

        .int-lang-icon {
          width: 3.375rem;
          height: 3.375rem;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 0.875rem;
          border: 1px solid rgba(255,255,255,0.08);
          background: transparent;
          transition:
            border-color 0.22s cubic-bezier(0.4,0,0.2,1),
            background   0.22s cubic-bezier(0.4,0,0.2,1),
            box-shadow   0.22s cubic-bezier(0.4,0,0.2,1);
        }
        .int-lang-btn:hover .int-lang-icon {
          border-color: rgba(255,255,255,0.16);
          background: rgba(255,255,255,0.04);
        }
        .int-lang-btn--on .int-lang-icon {
          border-color: rgba(255,255,255,0.22);
          background: linear-gradient(160deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.01) 100%);
          box-shadow: 0 0 0 1px rgba(255,255,255,0.04) inset,
                      0 4px 16px rgba(0,0,0,0.25);
        }

        .int-lang-label {
          font-size: 0.78125rem;
          font-weight: 500;
          letter-spacing: -0.01em;
          color: inherit;
          transition: color 0.22s cubic-bezier(0.4,0,0.2,1);
        }

        /* ──────────────────────────────────────────────────────
           CODE CARD
        ────────────────────────────────────────────────────── */
        .int-card {
          position: relative;
          border: 1px solid rgba(255,255,255,0.09);
          border-radius: 1.25rem;
          overflow: hidden;
          background: #050508;
          box-shadow:
            0 0 0 1px rgba(255,255,255,0.03) inset,
            0 32px 80px rgba(0,0,0,0.45),
            0 8px 32px rgba(0,0,0,0.3);
        }

        /* Shimmer gradient lines on corners */
        .int-card-shimmer-top,
        .int-card-shimmer-bot {
          position: absolute;
          height: 1px;
          width: 320px;
          pointer-events: none;
          z-index: 10;
        }
        .int-card-shimmer-top {
          top: 0; right: 0;
          background: linear-gradient(90deg,
            transparent 0%,
            rgba(255,255,255,0.08) 30%,
            rgba(200,200,200,0.45) 65%,
            rgba(236,72,153,0) 100%
          );
        }
        .int-card-shimmer-bot {
          bottom: 0; left: 0;
          background: linear-gradient(90deg,
            transparent 0%,
            rgba(255,255,255,0.06) 30%,
            rgba(200,200,200,0.3) 65%,
            transparent 100%
          );
        }

        /* ──────────────────────────────────────────────────────
           CARD HEADER
        ────────────────────────────────────────────────────── */
        .int-card-header {
          position: relative;
          display: flex;
          align-items: center;
          height: 3.75rem;
          border-bottom: 1px solid rgba(255,255,255,0.06);
          gap: 0;
          background: rgba(0,0,0,0.4);
          backdrop-filter: blur(8px);
          z-index: 5;
          overflow: hidden;
        }

        .int-fw-tabs {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          overflow-x: auto;
          scrollbar-width: none;
          padding: 0 0.75rem;
          flex: 1;
          min-width: 0;
          height: 100%;
        }
        .int-fw-tabs::-webkit-scrollbar { display: none; }
        .int-fw-fade {
          position: absolute;
          right: 6.5rem;
          top: 0;
          height: 100%;
          width: 3rem;
          background: linear-gradient(to left, rgba(5,5,8,0.9) 0%, transparent 100%);
          pointer-events: none;
          z-index: 2;
        }

        .int-fw-tab {
          position: relative;
          display: inline-flex;
          align-items: center;
          gap: 0.375rem;
          height: 2.125rem;
          padding: 0 0.625rem;
          border-radius: 0.5rem;
          border: 1px solid transparent;
          background: transparent;
          color: rgba(255,255,255,0.38);
          font-size: 0.8125rem;
          font-weight: 500;
          letter-spacing: -0.01em;
          font-family: inherit;
          cursor: pointer;
          white-space: nowrap;
          flex-shrink: 0;
          outline: none;
          transition:
            color       0.18s cubic-bezier(0.4,0,0.2,1),
            background  0.18s cubic-bezier(0.4,0,0.2,1),
            border-color 0.18s cubic-bezier(0.4,0,0.2,1);
        }
        .int-fw-tab:hover {
          color: rgba(255,255,255,0.72);
          background: rgba(255,255,255,0.04);
        }
        .int-fw-tab--on {
          color: #ffffff;
          background: linear-gradient(160deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.04) 100%);
          border-color: rgba(255,255,255,0.14);
        }

        .int-fw-icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 1.125rem;
          height: 1.125rem;
          border-radius: 0.2rem;
          border: 1px solid rgba(255,255,255,0.12);
          background: rgba(0,0,0,0.5);
          overflow: hidden;
          flex-shrink: 0;
          /* scale down the svg which is 28×28 */
          position: relative;
        }
        .int-fw-icon > svg {
          width: 28px; height: 28px;
          transform: scale(0.52);
          position: absolute;
        }

        /* ──────────────────────────────────────────────────────
           COPY BUTTON
        ────────────────────────────────────────────────────── */
        .int-copy-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.375rem;
          height: 2.125rem;
          padding: 0 0.75rem;
          margin-right: 0.75rem;
          border-radius: 0.5rem;
          border: 1px solid rgba(255,255,255,0.1);
          background: rgba(255,255,255,0.04);
          color: rgba(255,255,255,0.55);
          font-size: 0.8125rem;
          font-weight: 500;
          font-family: inherit;
          cursor: pointer;
          outline: none;
          white-space: nowrap;
          flex-shrink: 0;
          position: relative;
          z-index: 3;
          transition:
            color        0.18s cubic-bezier(0.4,0,0.2,1),
            background   0.18s cubic-bezier(0.4,0,0.2,1),
            border-color 0.18s cubic-bezier(0.4,0,0.2,1),
            box-shadow   0.18s cubic-bezier(0.4,0,0.2,1);
        }
        .int-copy-btn:hover {
          color: #fff;
          border-color: rgba(255,255,255,0.2);
          background: rgba(255,255,255,0.08);
          box-shadow: 0 2px 12px rgba(0,0,0,0.25);
        }
        .int-copy-btn--done {
          color: #4ade80;
          border-color: rgba(74,222,128,0.3);
          background: rgba(74,222,128,0.06);
        }
        .int-copy-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.2s cubic-bezier(0.34,1.56,0.64,1);
        }
        .int-copy-btn--done .int-copy-icon {
          transform: scale(1.15);
        }
        .int-copy-label {
          font-size: 0.78rem;
          font-weight: 500;
        }

        /* ──────────────────────────────────────────────────────
           CODE BODY
        ────────────────────────────────────────────────────── */
        .int-code-body {
          overflow: auto;
          max-height: 420px;
          min-height: 280px;
          padding-bottom: 5.5rem;
          animation: codeFadeIn 0.28s cubic-bezier(0.4,0,0.2,1) both;
        }
        @keyframes codeFadeIn {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0);   }
        }

        .int-pre {
          margin: 0;
          padding: 1rem 1rem 0 0;
          background: transparent;
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 0.84375rem;
          line-height: 1.625;
          white-space: pre;
          color: #e2e8f0;
          tab-size: 2;
        }

        /* ──────────────────────────────────────────────────────
           CARD FOOTER — GitHub + Download
        ────────────────────────────────────────────────────── */
        .int-card-footer {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          display: flex;
          align-items: center;
          gap: 0.625rem;
          padding: 1rem 1.125rem 1.125rem;
          background: linear-gradient(to top,
            rgba(5,5,8,0.98) 0%,
            rgba(5,5,8,0.92) 55%,
            transparent 100%
          );
          z-index: 6;
        }

        /* Shared button base */
        .int-footer-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          height: 2rem;
          padding: 0 0.875rem;
          border-radius: 0.5rem;
          font-size: 0.78125rem;
          font-weight: 500;
          font-family: inherit;
          letter-spacing: -0.01em;
          text-decoration: none;
          cursor: pointer;
          outline: none;
          white-space: nowrap;
          transition:
            color        0.2s cubic-bezier(0.4,0,0.2,1),
            background   0.2s cubic-bezier(0.4,0,0.2,1),
            border-color 0.2s cubic-bezier(0.4,0,0.2,1),
            box-shadow   0.2s cubic-bezier(0.4,0,0.2,1),
            transform    0.18s cubic-bezier(0.34,1.56,0.64,1);
        }
        .int-footer-btn:hover {
          transform: translateY(-1px);
        }
        .int-footer-btn:active {
          transform: translateY(0) scale(0.97);
        }

        /* Ghost style (GitHub) */
        .int-footer-btn--ghost {
          color: rgba(255,255,255,0.55);
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.1);
        }
        .int-footer-btn--ghost:hover {
          color: #ffffff;
          background: rgba(255,255,255,0.1);
          border-color: rgba(255,255,255,0.22);
          box-shadow: 0 4px 14px rgba(0,0,0,0.35);
        }

        /* Outline style (Download) */
        .int-footer-btn--outline {
          color: rgba(255,255,255,0.45);
          background: transparent;
          border: 1px solid rgba(255,255,255,0.08);
        }
        .int-footer-btn--outline:hover {
          color: rgba(255,255,255,0.85);
          background: rgba(255,255,255,0.06);
          border-color: rgba(255,255,255,0.18);
          box-shadow: 0 4px 14px rgba(0,0,0,0.25);
        }

        /* Arrow indicator on github link */
        .int-footer-btn-arrow {
          font-size: 0.65rem;
          opacity: 0.5;
          transition: opacity 0.18s, transform 0.18s;
        }
        .int-footer-btn--ghost:hover .int-footer-btn-arrow {
          opacity: 0.9;
          transform: translate(1px, -1px);
        }

        /* ──────────────────────────────────────────────────────
           RESPONSIVE
        ────────────────────────────────────────────────────── */
        @media (max-width: 768px) {
          .int-section {
            padding: 3.5rem 1rem 5rem;
          }
          .int-lang-row {
            justify-content: flex-start;
            padding-left: 0.25rem;
          }
          .int-lang-icon {
            width: 3rem;
            height: 3rem;
          }
          .int-fw-fade {
            right: 5.5rem;
            width: 2.5rem;
          }
          .int-copy-label {
            display: none;
          }
        }

        @media (max-width: 480px) {
          .int-title { font-size: 2.25rem; }
          .int-lang-icon { width: 2.75rem; height: 2.75rem; border-radius: 0.75rem; }
          .int-lang-row { gap: 0.75rem; }
          .int-card { border-radius: 1rem; }
        }
      `}</style>
    </section>
  );
}
