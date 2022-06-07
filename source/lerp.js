import { add, sub, cross } from "./vector.js"

//======//
// LERP //
//======//
export const lerp = (distance, line) => {

	const [a, b] = line
	const [ax, ay] = a
	const [bx, by] = b
	
	const x = ax + (bx - ax) * distance
	const y = ay + (by - ay) * distance

	const point = [x, y]
	return point

}

export const bilerp = (displacement, corners) => {

	const [dx, dy] = displacement
	const [a, b, c, d] = corners

	const la = lerp(dx, [a, b])
	const lb = lerp(dx, [c, d])
	const line = [la, lb]

	const point = lerp(dy, line)
	return point
}

// https://iquilezles.org/articles/ibilinear/
export const invBilinear = (p, [a, b, d, c]) => {
	const e = sub(b, a)
	const f = sub(d, a)
	const g = add(sub(a, b), sub(c, d))
	const h = sub(p, a)

	const k2 = cross(g, f)
	const k1 = cross(e, f) + cross(h, g)
	const k0 = cross(h, e)
		
	// if edges are parallel, this is a linear equation
	if (Math.abs(k2) < 0.001) {
		return [ (h[0]*k1+f[0]*k0)/(e[0]*k1-g[0]*k0), -k0/k1 ];
	} else { // otherwise, it's a quadratic
		let w = k1*k1 - 4*k0*k2;
		//if (w < 0) return [-1, -1];
		w = Math.sqrt(w);

		const ik2 = 0.5/k2;
		let v = (-k1 - w)*ik2;
		let u = (h[0] - f[0]*v)/(e[0] + g[0]*v);

		if (u<0.0 || u>1.0 || v<0.0 || v>1.0) {
			v = (-k1 + w)*ik2;
			u = (h[0] - f[0]*v)/(e[0] + g[0]*v);
		}
		return [u, v];
	}
}