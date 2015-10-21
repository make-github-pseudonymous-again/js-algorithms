
/**
 * Greedy algorithm for computing the maximum independent set.
 * For max-weight independent set give the input in decreasing order wrt weights.
 */

const max_independent_set = function ( independent , S ) {

	const set = [ ] ;

	loop : for ( const u of S ) {

		for ( const v of set ) {
			if ( !independent( u , v ) ) continue loop ;
		}

		set.push( u ) ;

	}

	return set ;

} ;

exports.max_independent_set = max_independent_set ;
