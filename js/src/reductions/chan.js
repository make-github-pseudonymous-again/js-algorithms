
/**
 * Timoty Chan (1999)
 * Geometric Applications of a Randomized Optimization Technique
 *
 * Translates any decision algorithm for a question of the type "is the optimal
 * value for this problem less/greater than `c`?" to a randomized optimisation
 * algortihm that finds the optimal value of `c*` whose expected time complexity
 * is within a constant factor of the complexity of the decision algorithm.
 * For this to work we must be capable of splitting a problem into a constant
 * number of smaller (by a constant factor) subproblems so that the optimal
 * value of the original problem is the min/max of the optimal values for the
 * subproblems. For example, given a decision algorithm `decide( G , c )`
 * that decides whether graph G has diameter greater than c, we can split the
 * problem into k^2 subproblems of size (2n/k), that is, the diameter of G is
 * the maximum over the diameters of all subgraphs that are the union of 2
 * disjoint subgraphs taken from a partition of G into k disjoint subgraphs of
 * size n/k. Finding the optimal k for a given problem requires to solve a
 * reccurence expressing the time-complexity of the following meta-algorithm.
 * Read Timoty Chan's paper for more information.
 */

const chan = function ( split , shuffle , decide , bruteforce , issmall ) {

	const solve = function ( instance ) {

		if ( issmall( instance ) ) return bruteforce( instance ) ;

		const [ first , ...rest ] = shuffle( split( instance ) ) ;

		let [ current , optimum ] = solve( first ) ;

		for ( const candidate of rest ) {

			if ( decide( candidate , optimum ) ) {
				[ current , optimum ] = solve( candidate ) ;
			}

		}

		return [ current , optimum ] ;

	} ;

	return solve ;

} ;

exports.chan = chan ;
