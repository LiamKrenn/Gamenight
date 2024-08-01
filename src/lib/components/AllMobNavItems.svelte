<script lang="ts">
	import MobNavItems from '$lib/components/MobNavItems.svelte';
	import HomeActive from '$lib/icons/mobnav/house-active.svg?raw';
	import UsersActive from '$lib/icons/mobnav/users-active.svg?raw';
	import HomeInactive from '$lib/icons/mobnav/house-inactive.svg?raw';
	import UsersInactive from '$lib/icons/mobnav/users-inactive.svg?raw';
	import Gamepad_2Active from '$lib/icons/mobnav/gamepad-2-active.svg?raw';
	import Gamepad_2Inactive from '$lib/icons/mobnav/gamepad-2-inactive.svg?raw';
	import ShoppingCartActive from '$lib/icons/mobnav/shopping-cart-active.svg?raw';
	import ShoppingCartInactive from '$lib/icons/mobnav/shopping-cart-inactive.svg?raw';
</script>

<MobNavItems route="/" active={HomeActive} inactive={HomeInactive} />
<MobNavItems route="/games" active={Gamepad_2Active} inactive={Gamepad_2Inactive} />
<MobNavItems route="/shop" active={ShoppingCartActive} inactive={ShoppingCartInactive} />
<MobNavItems route="/friends" active={UsersActive} inactive={UsersInactive} />
