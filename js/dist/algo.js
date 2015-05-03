( function ( ) {

'use strict' ;

var definition = function ( exports , undefined ) {


/* js/src/3sum */
/* js/src/3sum/_3sum_n2.js */


/**
 * Hypothesis :
 *   - A is sorted in increasing order
 *   - B is sorted in increasing order
 *   - |A| > 0
 *   - |B| > 0
 */

var _3sum_n2 = function (A, ai, aj, B, bi, bj, C, ci, cj, fn) {

	var hi, lo, a, b, c, v;

	for (; ci < cj; ++ci) {
		lo = ai;
		hi = bj - 1;

		do {

			a = A[lo];
			b = B[hi];
			c = C[ci];
			v = a + b;

			if (-c === v) fn(a, b, c);

			if (-c < v) --hi;
			else ++lo;

		} while (lo < aj && hi >= bi);
	}

};

exports._3sum_n2 = _3sum_n2;
/* js/src/4sum */
/* js/src/4sum/sortxy_n3.js */

/**
 * X is sorted in increasing order
 * Y is sorted in increasing order
 * compare takes 4 arguments and returns <=> 0
 * output takes 4 arguments
 *
 */
var sortxy_n3 = function ( compare , X , Y ,  Xi1 , Xj1 , Yi1 , Yj1 , Xi2 , Xj2 , Yi2 , Yj2 , output ) {

	var a , b , c , d , s ;

	if ( Xi1 > Xj1 || Yi1 > Yj1 || Xi2 > Xj2 || Yi2 > Yj2 ) {
		return ;
	}

	//  -----------------------------
	// |              X              |
	//  -----------------------------
	// Xi                           Xj

	//  -----------------------------
	// |              Y              |
	//  -----------------------------
	// Yi                           Yj

	a = X[Xi1] ;
	b = Y[Yj1] ;
	c = X[Xj2] ;
	d = Y[Yi2] ;

	s = compare( a , b , c , d ) ;

	if ( s === 0 ) {

		output( Xi1 , Yj1 , Xj2 , Yi2 ) ;

		sortxy_n3( compare , X , Y , Xi1 + 1 , Xj1 , Yi1 , Yj1 , Xi2 , Xj2 , Yi2 , Yj2 , output ) ;
		sortxy_n3( compare , X , Y , Xi1 , Xi1 , Yi1 , Yj1 - 1 , Xi2 , Xj2 , Yi2 , Yj2 , output ) ;
		sortxy_n3( compare , X , Y , Xi1 , Xi1 , Yj1 , Yj1 , Xi2 , Xj2 - 1 , Yi2 , Yj2 , output ) ;

	}

	else if ( s < 0 ) {

		sortxy_n3( compare , X , Y , Xi1 + 1 , Xj1 , Yi1 , Yj1 , Xi2 , Xj2 , Yi2 , Yj2 , output ) ;
		sortxy_n3( compare , X , Y , Xi1 , Xi1 , Yi1 , Yj1 , Xi2 , Xj2 - 1 , Yi2 , Yj2 , output ) ;

	}

	else {

		sortxy_n3( compare , X , Y , Xi1 , Xj1 , Yi1 , Yj1 - 1 , Xi2 , Xj2 , Yi2 , Yj2 , output ) ;
		sortxy_n3( compare , X , Y , Xi1 , Xj1 , Yj1 , Yj1 , Xi2 , Xj2 , Yi2 + 1 , Yj2 , output ) ;

	}


} ;

exports.sortxy_n3 = sortxy_n3 ;

/* js/src/4sum/sortxy_n4.js */

/**
 * X is sorted in increasing order
 * Y is sorted in increasing order
 * compare takes 4 arguments and returns <=> 0
 * output takes 4 arguments
 *
 */
var sortxy_n4 = function ( compare , X , Y ,  Xi1 , Xj1 , Yi1 , Yj1 , Xi2 , Xj2 , Yi2 , Yj2 , output ) {

	var a , b , c , d , s ;

	if ( Xi1 > Xj1 || Yi1 > Yj1 || Xi2 > Xj2 || Yi2 > Yj2 ) {
		return ;
	}

	//  -----------------------------
	// |              X              |
	//  -----------------------------
	// Xi                           Xj

	//  -----------------------------
	// |              Y              |
	//  -----------------------------
	// Yi                           Yj

	a = X[Xi1] ;
	b = Y[Yi1] ;
	c = X[Xi2] ;
	d = Y[Yi2] ;

	s = compare( a , b , c , d ) ;

	if ( s === 0 ) {

		output( Xi1 , Yi1 , Xi2 , Yi2 ) ;

	}

	sortxy_n4( compare , X , Y , Xi1 + 1 , Xj1 , Yi1 , Yj1 , Xi2 , Xj2 , Yi2 , Yj2 , output ) ;
	sortxy_n4( compare , X , Y , Xi1 , Xi1 , Yi1 + 1 , Yj1 , Xi2 , Xj2 , Yi2 , Yj2 , output ) ;
	sortxy_n4( compare , X , Y , Xi1 , Xi1 , Yi1 , Yi1 , Xi2 + 1 , Xj2 , Yi2 , Yj2 , output ) ;
	sortxy_n4( compare , X , Y , Xi1 , Xi1 , Yi1 , Yi1 , Xi2 , Xi2 , Yi2 + 1 , Yj2 , output ) ;

} ;

exports.sortxy_n4 = sortxy_n4 ;

/* js/src/array */
/* js/src/array/iter.js */



var fiter = function ( i, j, fn ) {
	for ( ; i < j ; ++i ) {
		fn( i );
	}
};

var biter = function ( i, j, fn ) {
	while ( --j >= i ) {
		fn( j );
	}
};



exports.fiter = fiter;
exports.biter = biter;

/* js/src/bdp */
/* js/src/bdp/bdpdc.js */

/**
 * Bichromatic dominating pairs using the divide and conquer chainsaw.
 *
 * see F. P. Preparata and M. I. Shamos, Computational Geometry, NY, 1985, p. 366.
 *
 * Here the algorithm handles non-strict ( >= ) dominance.
 *
 * select( f, a, i, j, k ) where
 *   f is a comparator
 *   a the array of points
 *   [i, j[ the range to search in the array
 *   k the index to select
 *
 * select(...) partitions the array in tree regions
 *  -----------------------------
 * |    <= h    | h |    >= h    |
 *  -----------------------------
 * i    ....    k  k+1   ....   j-1
 *
 * __eq__( d, v ) template for a function eq( a )
 *   returns true iff coordinate d of a equals v
 *
 * __ne__( d, v ) template for a function ne( y )
 *   returns true iff coordinate d of a is not equal to v
 *
 * color( point )
 *   = 0 if point is blue
 *   = 1 if point is red
 *
 * p = split( predicate, a, i, j )
 *   rearranges an array so that all elements for which predicate is false
 *   are in interval [i, p[ and all other elements are in interval [p, j[
 *
 * swap( a, ai, aj, b, bi )
 *   swap elements from a in interval [ai, aj[ with elements from b in interval
 *   [bi, bi + aj - ai[
 *
 */


var __bdpdc__ = function ( select, __eq__, __ne__, color, split, swap ) {

	/**
	 * a is an array of points
	 *
	 *     note that we only consider points starting
	 *     at index i and ending at index j-1 in a
	 *
	 * points are arrays of coordinates
	 *
	 *     d = dj - di is the number of coordinates of each point
	 *
	 *
	 * __f__ is a template for a function {coordinates^2} -> {<0, =0, >0} named f
	 *
	 *     i.e. for coordinates a and b
	 *
	 *       f( a, b ) < 0 means a < b;
	 *       f( a, b ) = 0 means a = b;
	 *       f( a, b ) > 0 means a > b.
	 *
	 * out is the output array
	 *
	 */

	var bdpdc = function ( __f__, a, i, j, di, dj, out ) {

		var k, h, x, y, p, q, m, n, _m, _n;

		// empty or one element array case

		if ( i >= j - 1 ) {
			return out;
		}

		// base case : dj - di = d = 0
		// enumerate all red / blue pairs
		// [i, p[ contains only blue points
		// [p, j[ contains only red points
		// p = index of first red point

		if ( di === dj ) {

			// move all blue points left and all red points right
			// (arbitrary choice)

			p = split( color, a, i, j );

			// for each red point

			for ( x = p ; x < j ; ++x ) {

				// for each blue point

				for ( y = i ; y < p ; ++y ) {

					out.push( [ a[x], a[y] ] );

				}
			}

			return out;

		}

		/**
		 * recursion fairy
		 *
		 * we compute m such that h is the median of
		 * the ith coordinate of all points
		 *
		 */

		else {


			//  -------------------------------------------------------
			// |                     b&r scrambled                     |
			//  -------------------------------------------------------
			// i                                                       j

			k = ( i + j ) / 2 | 0;

			//  -------------------------------------------------------
			// |                     b&r scrambled                     |
			//  -------------------------------------------------------
			// i                         k                             j

			// select median element
			// O(n)

			select( __f__( di ), a, i, j, k );

			h = a[k][di];

			//  -------------------------------------------------------
			// |         b&r <= h        | h |         b&r >= h        |
			//  -------------------------------------------------------
			// i                         k                             j


			// we do 3 recursive calls
			//
			// first: for red and blue points with di < h in R^d
			// we do not consider points with di = h because either
			//
			// 1. red = h, blue < h --> handled by last call
			// 2. red < h, blue = h --> red cannot dominate blue
			// 3. red = h, blue = h --> handled by last call
			//    (would be "red cannot dominate blue" for strict dominance
			//    in this 3rd case)
			//
			// second: for red and blue points with di > h in R^d
			// we do not consider points with di = h for similar reasons as above
			//
			// last: for red points with di >= h and blue points with di <= h in R^{d-1}
			// (would be > and < for strict dominance)
			//
			// note that we do not need to handle the case where red < h and blue >= h
			// or red <= h and blue > h since red cannot dominate blue in those cases

			// first recursive call
			// we only consider points that have di < h
			// since all points that have di = h will be handled later

			// move median elements from [ i, k [ in the [ x, k [ interval, x >= i
			// O(n)

			x = split( __eq__( di, h ), a, i, k );

			//  -------------------------------------------------------
			// |    b&r < h    | b&r = h | h |         b&r > h         |
			//  -------------------------------------------------------
			// i               x         k                             j

			bdpdc( __f__, a, i, x, di, dj, out );

			// move median elements from [ k + 1, j [ in the [ y, j [ interval, y <= j
			// O(n)

			y = split( __ne__( di, h ), a, k + 1, j );

			//  -------------------------------------------------------
			// |    b&r < h    | b&r = h | h | b&r = h |    b&r > h    |
			//  -------------------------------------------------------
			// i               x         k             y               j

			bdpdc( __f__, a, y, j, di, dj, out );

			// since we do not touch median elements in the first two
			// recursive calls they are still at the correct place

			// Now we want to
			//   - move red points such that di < h to the right
			//   - move red points such that di >= h to the left
			//
			// /!\ Note that we also might think that we should
			//   - move blue points such that di > h to the right
			//   - move blue points such that di <= h to the left
			// but after the selection algorithm this is already the case


			//  -------------------------------------------------------
			// |    b&r < h    | b&r = h | h | b&r = h |    b&r > h    |
			//  -------------------------------------------------------
			// i               x         k             y               j

			p = split( color, a, i, x );

			//  -------------------------------------------------------
			// | b < h | r < h | b&r = h | h | b&r = h |    b&r > h    |
			//  -------------------------------------------------------
			// i       p       x         k             y               j

			q = split( color, a, y, j );

			//  -------------------------------------------------------
			// | b < h | r < h | b&r = h | h | b&r = h | b > h | r > h |
			//  -------------------------------------------------------
			// i       p       x         k             y       q       j

			// we now want to swap r < h elements with r > h elements
			// we have 3 cases
			//   1. x - p = j - q
			//   2. x - p < j - q
			//   3. x - p > j - q

			m = x - p;
			n = j - q;


			//   1. x - p = j - q

			if ( m === n ) {
				swap( a, q, j, a, p );

				//  -------------------------------------------------------
				// | b < h | r > h | b&r = h | h | b&r = h | b > h | r < h |
				//  -------------------------------------------------------
				// i       p       x         k             y       q       j

				j = y;

				//  -------------------------------------------------------
				// | b < h | r > h | b&r = h | h | b&r = h | b > h | r < h |
				//  -------------------------------------------------------
				// i       p       x         k             j      ...

			}


			//   2. x - p < j - q

			else if ( m < n ) {

				swap( a, p, x, a, q );

				//  ---------------------------------------------------------------
				// | b < h | r > h | b&r = h | h | b&r = h | b > h | r < h | r > h |
				//  ---------------------------------------------------------------
				// i       p       x         k             y       q      q+m      j

				// we now want to swap b > h and r < h elements with r > h elements
				//                     [y,q[    [q,q+m[             [q+m,j[
				// we have 2 cases
				//   1. (q + m) - y >= j - (q + m) [OR  >]
				//   2. (q + m) - y  < j - (q + m) [OR <=]

				_m = (q + m) - y;
				_n = j - (q + m);

				//   1. (q + m) - y >= j - (q + m)
				if ( _m >= _n ) {
					swap( a, q + m, j, a, y );
				}
				//   2. (q + m) - y  < j - (q + m)
				else {
					swap( a, j - _m, j, a, y );
				}

				//  ---------------------------------------------------------------
				// | b < h | r > h | b&r = h | h | b&r = h | r > h |   b>h & r<h   |
				//  ---------------------------------------------------------------
				// i       p       x         k             y      y+_n             j

				j = y + _n;

				//  ---------------------------------------------------------------
				// | b < h | r > h | b&r = h | h | b&r = h | r > h |   b>h & r<h   |
				//  ---------------------------------------------------------------
				// i       p       x         k             y       j      ...

			}


			//   3. x - p > j - q

			else {

				swap( a, q, j, a, p );

				//  ---------------------------------------------------------------
				// | b < h | r > h | r < h | b&r = h | h | b&r = h | b > h | r < h |
				//  ---------------------------------------------------------------
				// i       p      p+n      x         k             y       q       j

				// we now want to swap r < h with b&r = h elements
				// we have 2 cases
				//   1. x - (p + n) >= y - x
				//   2. x - (p + n)  < y - x

				_m = x - (p + n);
				_n = y - x;

				//   1. x - (p + n) >= y - x
				if ( _m >= _n ) {
					swap( a, x, y, a, p + n );
				}
				//   2. x - (p + n)  < y - x
				else {
					swap( a, y - _m, y, a, p + n );
				}

				//  -----------------------------------------------------------
				// | b < h | r > h |     b&r = h     | h | b&r = h | b>h & r<h |
				//  -----------------------------------------------------------
				// i       p      p+n                k            y-_m         j

				j = y - _m;

				//  -----------------------------------------------------------
				// | b < h | r > h |     b&r = h     | h | b&r = h | b>h & r<h |
				//  -----------------------------------------------------------
				// i       p      p+n                k             j    ...

			}

			// [i, j[ now contains only b <= h and r >= h points
			// in this new interval, all r points dominate b points
			// for the ith coordinate
			// we can thus ask the recursion fairy to take care of the other
			// dj - di - 1 dimensions left

			bdpdc( __f__, a, i, j, di + 1, dj, out );

			return out;
		}

	};

	return bdpdc;

};

exports.__bdpdc__ = __bdpdc__;

/* js/src/bdp/bdpdn2.js */

/**
 * Bichromatic dominating pairs using a naïve O(d * n^2) algorithm.
 *
 * Here the algorithm handles non-strict ( >= ) dominance.
 *
 * color( point )
 *   = 0 if point is blue
 *   = 1 if point is red
 *
 * p = split( predicate, a, i, j )
 *   rearranges an array so that all elements for which predicate is false
 *   are in interval [i, p[ and all other elements are in interval [p, j[
 *
 */


var __bdpdn2__ = function ( color, split ) {

	/**
	 * a is an array of points
	 *
	 *     note that we only consider points starting
	 *     at index i and ending at index j-1 in a
	 *
	 * points are arrays of coordinates
	 *
	 *     d = dj - di is the number of coordinates of each point
	 *
	 *
	 * __f__ is a template for a function {coordinates^2} -> {<0, =0, >0} named f
	 *
	 *     i.e. for coordinates a and b
	 *
	 *       f( a, b ) < 0 means a < b;
	 *       f( a, b ) = 0 means a = b;
	 *       f( a, b ) > 0 means a > b.
	 *
	 * out is the output array
	 *
	 */

	var bdpdn2 = function ( __f__, a, i, j, di, dj, out ) {

		var x, y, p, d, f;

		// empty or one element array case

		if ( i >= j - 1 ) {
			return out;
		}

		// move all blue points left and all red points right
		// (arbitrary choice)

		// [i, p[ contains only blue points
		// [p, j[ contains only red points
		// p = index of first red point

		p = split( color, a, i, j );

		// for each red point

		red : for ( x = p ; x < j ; ++x ) {

			// for each blue point

			blue : for ( y = i ; y < p ; ++y ) {

				for ( d = di ; d < dj ; ++d ) {

					f = __f__( d );

					if ( f( a[x], a[y] ) < 0 ) {
						continue blue;
					}

				}

				out.push( [ a[x], a[y] ] );

			}
		}

		return out;

	};

	return bdpdn2;

};

exports.__bdpdn2__ = __bdpdn2__;

/* js/src/birthdays */
/* js/src/birthdays/samebirthday.js */


/**
 *
 * Computes the probability ( [0, 1] ) for at least 1 of k people
 * out of n to have his birthday the same day as someone else.
 *
 * hypothesis : k <= n and k <= days
 */

var samebirthday = function ( k, n, days ) {

	var i, p;

	p = 1;

	for ( i = 1 ; i < k ; ++i ) {

		p = p * ( days - i ) / days;

	}

	for ( ; i < n ; ++i ) {

		p = p * ( days - k ) / days;

	}


	return 1 - p;

};

exports.samebirthday = samebirthday;

/* js/src/epsilon */
/* js/src/epsilon/absepsilon.js */


var __absepsilon__ = function ( epsilon ) {


	return function ( a, b ) {

		var r;

		r = a - b;

		return r < -epsilon ? -1 : r > epsilon ? 1 : 0;

	};

};

exports.__absepsilon__ = __absepsilon__;

/* js/src/epsilon/relepsilon.js */

var __relepsilon__ = function ( epsilon ) {


	return function ( a, b ) {

		var r;

		if ( b === 0 ) {
			return a;
		}

		else if ( a === 0 ) {
			return -b;
		}

		else {

			r = a / b - 1;

			return r < -epsilon ? -1 : r > epsilon ? 1 : 0;

		}

	};

};

exports.__relepsilon__ = __relepsilon__;

/* js/src/kldt */
/* js/src/kldt/evenkldtto2sum.js */


/**
 * Transforms an instance of the one-set version of kLDT with k >= 4 even into
 * a two-set version of 2SUM.
 *
 * @param {set} S is the input set for the kLDT problem
 * @param {coefficients} a is the array of coefficients
 * @param {set} A is one of the input set for 2SUM
 * @param {set} B is one of the input set for 2SUM
 *
 * notes:
 *   - n = Sj - Si
 *   - k = aj - ai - 1
 *   - a_0 = a[ai]
 *   - A and B must be of size n^(k/2) each
 *   - B must be initialized to 0 ... 0
 *
 */

var evenkldtto2sum = function ( S , Si , Sj , a , ai , aj , A , Ai , Aj , B , Bi , Bj ) {

	var i , j , p , q , n , halfk ;

	n = Sj - Si ;

	k = aj - ai - 1 ;

	halfk = 1 + k / 2 ;

	// We fill A and B for example with S = [ 1 , 2 , 3 ] and a = [ t , v , w , x , y ]

	//       -----------------------------------------------------------------------
	// A <- |   t   |   t   |   t   |   t   |   t   |   t   |   t   |   t   |   t   |
	//       -----------------------------------------------------------------------

	for ( p = Ai ; p < Aj ; ++p ) {

		A[p] = a[ai] ;

	}

	//       -----------------------------------------------------------------------
	// A += | v * 1 | v * 2 | v * 3 | v * 1 | v * 2 | v * 3 | v * 1 | v * 2 | v * 3 |
	//       -----------------------------------------------------------------------
	//       -----------------------------------------------------------------------
	// A += | w * 1 | w * 1 | w * 1 | w * 2 | w * 2 | w * 2 | w * 3 | w * 3 | w * 3 |
	//       -----------------------------------------------------------------------

	for ( j = 1 , i = 1 ; j < halfk ; ++j , i *= n ) {

		for ( p = Ai , q = 0 ; p < Aj ; ++p , q = ( ( q + 1 ) / i | 0 ) % n ) {

			A[p] += a[ai + j] * S[Si + q] ;

		}

	}

	//       -----------------------------------------------------------------------
	// B += | x * 1 | x * 2 | x * 3 | x * 1 | x * 2 | x * 3 | x * 1 | x * 2 | x * 3 |
	//       -----------------------------------------------------------------------
	//       -----------------------------------------------------------------------
	// B += | y * 1 | y * 1 | y * 1 | y * 2 | y * 2 | y * 2 | y * 3 | y * 3 | y * 3 |
	//       -----------------------------------------------------------------------

	for ( i = 1 ; j <= k ; ++j , i *= n ) {

		for ( p = Bi , q = 0 ; p < Bj ; ++p , q = ( ( q + 1 ) / i | 0 ) % n ) {

			B[p] += a[ai + j] * S[Si + q] ;

		}

	}

} ;

exports.evenkldtto2sum = evenkldtto2sum;

/* js/src/kldt/oddkldtto3sum.js */


/**
 * Transforms an instance of the one-set version of kLDT with k >= 3 odd into
 * a three-set version of 3SUM.
 *
 * @param {set} S is the input set for the kLDT problem
 * @param {coefficients} a is the array of coefficients
 * @param {set} A is one of the input set for 3SUM
 * @param {set} B is one of the input set for 3SUM
 * @param {set} C is one of the input set for 3SUM
 *
 * notes:
 *   - n = Sj - Si
 *   - k = aj - ai - 1
 *   - a_0 = a[ai]
 *   - A and B must be of size n^((k-1)/2) each
 *   - A and B must be initialized to 0 ... 0
 *   - C must be of size n
 *
 */

var oddkldtto3sum = function ( S , Si , Sj , a , ai , aj , A , Ai , Aj , B , Bi , Bj , C , Ci , Cj ) {

	var i , j , p , q , n , halfk ;

	n = Sj - Si ;

	k = aj - ai - 1 ;

	halfk = 2 + ( k - 1 ) / 2 ;

	// We fill A and B for example with S = [ 1 , 2 , 3 ] and a = [ t , u , v , w , x , y ]

	//       -----------------------------------------------------------------------
	// A += | v * 1 | v * 2 | v * 3 | v * 1 | v * 2 | v * 3 | v * 1 | v * 2 | v * 3 |
	//       -----------------------------------------------------------------------
	//       -----------------------------------------------------------------------
	// A += | w * 1 | w * 1 | w * 1 | w * 2 | w * 2 | w * 2 | w * 3 | w * 3 | w * 3 |
	//       -----------------------------------------------------------------------

	for ( j = 2 , i = 1 ; j < halfk ; ++j , i *= n ) {

		for ( p = Ai , q = 0 ; p < Aj ; ++p , q = ( ( q + 1 ) / i | 0 ) % n ) {

			A[p] += a[ai + j] * S[Si + q] ;

		}

	}

	//       -----------------------------------------------------------------------
	// B += | x * 1 | x * 2 | x * 3 | x * 1 | x * 2 | x * 3 | x * 1 | x * 2 | x * 3 |
	//       -----------------------------------------------------------------------
	//       -----------------------------------------------------------------------
	// B += | y * 1 | y * 1 | y * 1 | y * 2 | y * 2 | y * 2 | y * 3 | y * 3 | y * 3 |
	//       -----------------------------------------------------------------------

	for ( i = 1 ; j <= k ; ++j , i *= n ) {

		for ( p = Bi , q = 0 ; p < Bj ; ++p , q = ( ( q + 1 ) / i | 0 ) % n ) {

			B[p] += a[ai + j] * S[Si + q] ;

		}

	}

	// We fill C

	//       -----------------------------------
	// C <- | u * 1 + t | u * 2 + t | u * 3 + t |
	//       -----------------------------------

	for ( q = 0 ; q < n ; ++q ) {

		C[Ci + q] = a[ai + 1] * S[Si + q] + a[ai] ;

	}

} ;

exports.oddkldtto3sum = oddkldtto3sum;

return exports ;
} ;
if ( typeof exports === "object" ) {
	definition( exports ) ;
}
else if ( typeof define === "function" && define.amd ) {
	define( "aureooms-js-algo" , [ ] , function ( ) { return definition( { } ) ; } ) ;
}
else if ( typeof window === "object" && typeof window.document === "object" ) {
	definition( window["algo"] = { } ) ;
}
else console.error( "unable to detect type of module to define for aureooms-js-algo") ;
} )( ) ;
